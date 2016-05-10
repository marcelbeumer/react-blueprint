// @flow
import React from 'react';
import memoize from 'lodash/memoize';
import cx from 'classnames';
import StyleSheet, { em } from './styles';
import theme from './theme';
import type { Element } from 'react';

const itemSize = 1;
const itemMargin = Math.round((itemSize / 6) * 10) / 10;

export const styles = StyleSheet.create({
  root: {
    color: theme.textColor,
    width: '100%',
    textAlign: 'center',
  },
  item: {
    display: 'inline-block',
    width: em(itemSize),
    height: em(itemSize),
    borderRadius: em(itemSize),
    textIndent: '-300px',
    overflow: 'hidden',
    border: `2px solid ${theme.highlightColor}`,
    backgroundColor: theme.highlightColor,
    margin: `0 ${itemMargin}em`,
    cursor: 'pointer',
    transition: 'all 0.3s linear',
  },
  itemInverse: {
    borderColor: theme.backgroundColor,
    backgroundColor: theme.backgroundColor,
  },
  itemInactive: {
    backgroundColor: 'transparent',
  },
});

type ItemDef = {name: string};
export const NavigationItem: Function = () => null;

function getItemIndex(screens: Array<ItemDef>, screen) {
  return screens.map(item => item.name).indexOf(screen);
}

export default class Navigation extends React.Component {
  props: {
    screen: string,
    setUrl: Function,
    getUrl: Function,
    inverse: boolean,
    children?: Array<Element>,
  };

  static defaultProps = {
    screen: '',
  };

  shouldComponentUpdate(nextProps: Object) {
    return this.props.screen !== nextProps.screen ||
      this.props.inverse !== nextProps.inverse;
  }

  getItemHandler: Function = memoize(name => () => {
    const { setUrl, getUrl } = this.props;
    setUrl(getUrl(name), name);
  });

  getItems(): Array<ItemDef> {
    const screens = [];
    React.Children.map(this.props.children, child => {
      if (child.type === NavigationItem) {
        screens.push({
          name: child.props.name,
        });
      }
    });
    return screens;
  }

  renderItems(screens: Array<ItemDef>): Array<Element> {
    const { screen: currentScreen, inverse } = this.props;
    const index = getItemIndex(screens, currentScreen);
    return screens.map((screen, i) => {
      const itemClasses = cx(styles.item, {
        [styles.itemInverse]: inverse,
        [styles.itemInactive]: i !== index,
      });
      return (
        <div
          key={`item-${i}`}
          className={itemClasses}
          onClick={this.getItemHandler(screen.name)}
        />
      );
    });
  }

  render() {
    const screens = this.getItems();
    return (
      <div className={styles.root}>
        {this.renderItems(screens)}
      </div>
    );
  }
}
