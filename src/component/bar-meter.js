import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import StyleSheet from './styles';
import color from 'color';

const { number, func } = React.PropTypes;
const { listOf, recordOf } = ImmutablePropTypes;

@pureRender
export default class BarMeter extends React.Component {

  static propTypes = {
    bars: listOf(recordOf({
      value: number,
      shade: number,
    })),
    onClick: func,
  }

  static defaultProps = {
    bars: new List(),
  }

  renderBars() {
    const { bars } = this.props;
    return bars.map(({ value, shade }, i) => {
      const perc = value * 100;
      const label = `${Math.round(perc)}%`;
      return (
        <div className={styles.item} key={`bar-${i}`}>
          <div className={styles.bar} style={{
            transform: `translateX(-50%) scaleX(${value}) translateX(50%)`,
            backgroundColor: color(barColor).darken(shade).rgbString(),
          }}>
          </div>
          <div className={styles.label}>{label}</div>
        </div>
      );
    });
  }

  render() {
    const { props } = this;
    return (
      <div className={styles.root} onClick={props.onClick}>
        {this.renderBars()}
      </div>
    );
  }
}

const barColor = '#ccc';

export const styles = StyleSheet.create({
  root: {
    padding: '10px',
    cursor: 'hand',
  },
  item: {
    display: 'flex',
  },
  label: {
    flex: '0 0 3.5em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 5px',
  },
  bar: {
    flex: '1 1 100%',
    height: '1em',
    backgroundColor: barColor,
    transition: '1s ease-in',
  },
});
