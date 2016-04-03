// @flow
import React from 'react';
import { List } from 'immutable';
import pureRender from './pure-render';
import StyleSheet, { px } from './styles';
import theme from './theme';
import type { Element } from 'react';

const itemMargin = 2;

export const styles = StyleSheet.create({
  root: {
    transform: 'translateZ(0)',
  },
  item: {
    height: '1em',
    padding: `0 0 ${itemMargin}px 0`,
    display: 'flex',
  },
  itemInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: px(theme.baseBorderRadius),
    backgroundColor: theme.highlightColor,
    color: theme.inverseTextColor,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});

export default class ItemList extends React.Component {
  props: {
    items: List<String>,
  };

  static defaultProps = {
    items: new List(),
  };

  renderItems(): Array<Element> {
    const { items } = this.props;
    return items.map((value, i) =>
      <div className={styles.item} key={`item-${i}`}>
        <div className={styles.itemInner}>
          {value}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems()}
      </div>
    );
  }
}

pureRender(ItemList);
