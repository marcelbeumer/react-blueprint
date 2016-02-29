import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import StyleSheet from './styles';
import theme from './theme';

const { number, func } = React.PropTypes;
const { listOf, recordOf } = ImmutablePropTypes;

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: '50px',
    cursor: 'pointer',
  },
  line: {
    position: 'absolute',
    top: '50%',
    left: '20px',
    width: 'calc(100% - 40px)',
    height: '1px',
    border: `1px dashed ${theme.primaryBorderColor}`,
    borderWidth: '1px 0 0',
  },
  dot: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '10px',
    transform: 'translate(-50%, -50%)',
    transition: '1s ease-in',
    transitionProperty: 'top, left',
    backgroundColor: theme.highlightColor,
  },
});

@pureRender
export default class DotPlotter extends React.Component {

  static propTypes = {
    dots: listOf(recordOf({
      x: number,
      y: number,
    })),
    onClick: func,
  }

  static defaultProps = {
    dots: new List(),
  }

  renderDots() {
    const { dots } = this.props;
    return dots.map(({ x, y }, i) =>
      <div className={styles.dot}
        key={`dot-${i}`}
        style={{
          top: `${y * 100}%`,
          left: `${x * 100}%`,
        }} />);
  }

  render() {
    const { props } = this;
    return (
      <div className={styles.root} onClick={props.onClick}>
        <div className={styles.line} />
        {this.renderDots()}
      </div>
    );
  }
}
