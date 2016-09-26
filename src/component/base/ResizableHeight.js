// @flow
import React from 'react';
import Gestures from './Gestures';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

const { max } = Math;

const scrollbarStyle: Object = {
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export const styles = StyleSheet.create({
  content: Object.assign({
    overflow: 'hidden',
    borderBottom: `1px solid ${theme.highlightColor}`,
  }, scrollbarStyle),
  handle: {
    cursor: 'pointer',
    width: px(60),
    height: px(15),
    margin: '0 auto',
    backgroundColor: theme.highlightColor,
    borderRadius: `0 0 ${theme.baseBorderRadius}px ${theme.baseBorderRadius}px`,
  },
});

export default class ResizableContent extends React.Component {
  props: {
    children?: any,
    height?: number,
    onResize: Function,
  };

  _content: Object;
  _handle: Object;

  static defaultProps = {
    height: 0,
    onResize: () => null,
  };

  onPan: Function = (e: Object) => {
    const { top: rootTop } = this._content.getBoundingClientRect();
    const { height: handleHeight } = this._handle.getBoundingClientRect();
    const { clientY } = e.pointers[0];
    const value = clientY - rootTop;
    this.props.onResize(max(handleHeight, value));
  };

  render() {
    const { props } = this;
    const contentStyle = {
      height: px(props.height),
    };

    return (
      <div>
        <div
          ref={el => { this._content = el; }}
          className={styles.content}
          style={contentStyle}
        >
          {props.children}
        </div>
        <Gestures vertical onPan={this.onPan}>
          <div className={styles.handle} ref={el => { this._handle = el; }} />
        </Gestures>
      </div>
    );
  }
}
