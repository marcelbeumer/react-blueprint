import React from 'react';
import { List } from 'immutable';
import { memoize } from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import cx from 'classnames';
import StyleSheet, { em } from '../styles';
import theme from '../theme';

const { assign } = Object;
const { string, shape, func } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const itemSize = 1.2;
const itemMargin = Math.round((itemSize / 8) * 10) / 10;

const arrowStyle = {
  width: em(itemSize),
  height: em(itemSize),
  backgroundColor: theme.highlightColor,
  margin: `0 ${itemMargin * 2}em`,
  cursor: 'pointer',
};

export const styles = StyleSheet.create({
  root: {
    color: theme.textColor,
    display: 'flex',
  },
  item: {
    width: em(itemSize),
    height: em(itemSize),
    borderRadius: em(itemSize),
    textIndent: '-300px',
    overflow: 'hidden',
    border: `1px solid ${theme.highlightColor}`,
    margin: `0 ${itemMargin}em`,
    cursor: 'pointer',
    transition: 'background-color 0.3s linear',
  },
  prevArrow: assign(arrowStyle, {
  }),
  nextArrow: assign(arrowStyle, {
  }),
  inactiveArrow: {
    cursor: 'default',
    opacity: 0.5,
  },
  itemActive: {
    backgroundColor: theme.highlightColor,
  },
});

@pureRender
export default class SceneNavigation extends React.Component {

  static propTypes = {
    items: listOf(shape({
      screen: string,
      label: string,
    })),
    screen: string,
    onChange: func,
  }

  static defaultProps = {
    items: new List([
      { screen: 'home', label: '1' },
      { screen: 'second', label: '2' },
      { screen: 'third', label: '2' },
    ]),
    screen: '',
    onChange: () => null,
  }

  getScreenIndex(screen) {
    return this.props.items.map(item => item.screen).indexOf(screen);
  }

  getItemHandler = memoize(screen => () => this.props.onChange(screen));

  renderItems() {
    const { items, screen } = this.props;
    const index = this.getScreenIndex(screen);
    return items.map((item, i) => {
      const itemClasses = cx(styles.item, {
        [styles.itemActive]: i === index,
      });
      return (
        <div key={`item-${i}`} className={itemClasses}
          onClick={this.getItemHandler(item.screen)}>
          {item.label}
        </div>
      );
    });
  }

  renderArrow(label, indexOffset) {
    const { items, screen } = this.props;
    const index = this.getScreenIndex(screen);
    const arrowIndex = index + indexOffset;
    const item = arrowIndex >= 0 && items.get(arrowIndex);
    return (
      <div key={`${label}-arrow`}
        className={cx(styles[`${label}Arrow`], !item && styles.inactiveArrow)}
        onClick={item && this.getItemHandler(item.screen)} />
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderArrow('prev', -1)}
        {this.renderItems()}
        {this.renderArrow('next', 1)}
      </div>
    );
  }
}
