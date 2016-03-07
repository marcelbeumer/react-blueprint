import React from 'react';
import { List } from 'immutable';
import { memoize } from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import cx from 'classnames';
import StyleSheet, { em } from './styles';
import theme from './theme';

const { string, shape, func } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const itemSize = 1.2;
const itemMargin = Math.round((itemSize / 8) * 10) / 10;

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
  itemActive: {
    backgroundColor: theme.highlightColor,
  },
});

global.L = List;

@pureRender
export default class MainNavigation extends React.Component {

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
      { screen: 'test', label: '2' },
    ]),
    screen: '',
    onChange: () => null,
  }

  getItemHandler = memoize(screen => () => this.props.onChange(screen));

  renderItems() {
    const { items, screen } = this.props;
    const index = items.map(item => item.screen).indexOf(screen);
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

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems()}
      </div>
    );
  }
}
