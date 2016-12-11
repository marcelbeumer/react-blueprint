// @flow
import React from 'react';
import {px} from '../styles';
import Gestures from './Gestures';
import styled from 'styled-components';
import withTheme from '../enhancer/withTheme';

const {min, max} = Math;

const Bar = styled.div`
  height: 1em;
  background-color: ${props => props.theme.highlightColor};
  border-radius: ${props => px(props.theme.baseBorderRadius)};
  margin: 0 0 5px 0;
  cursor: pointer;
`;

class BarMeter extends React.Component {
  props: {
    value: number,
    theme: Object,
    onChange: Function,
  }

  _root: Object;

  static defaultProps = {
    value: 1,
    onChange: () => null,
  }

  onPan:Function = (e: Object) => {
    const deltaX = e.eventDeltaX;
    if (isNaN(deltaX)) return;

    const {width} = this._root.getBoundingClientRect();
    const ratio = 1 / width;
    const {value, onChange} = this.props;

    const updatedValue = min(max(value + (deltaX * ratio), 0), 1);
    onChange(updatedValue, value);
  };

  render() {
    const {value, theme} = this.props;
    return (
      <div ref={el => { this._root = el; }}>
        <Gestures onPan={this.onPan}>
          <Bar style={{
            transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
            backgroundColor: theme.highlightColor,
          }}
          />
        </Gestures>
      </div>
    );
  }
}

export default withTheme(BarMeter);
