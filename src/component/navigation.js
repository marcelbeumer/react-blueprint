// @flow
import React from 'react';
import { List } from 'immutable';
import cx from 'classnames';
import StyleSheet, { em } from './styles';
import theme from './theme';
import pureRender from './pure-render';
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
  itemInactive: {
    backgroundColor: 'transparent',
  },
});

export default class Navigation extends React.Component {
  props: {
    screen: string,
    screenOrder: List<string>,
    setUrl: Function,
    getUrl: Function,
  };

  renderItems(screens: List<string>): List<Element> {
    const { screen: currentScreen, getUrl, setUrl } = this.props;
    const index = screens.indexOf(currentScreen);

    return screens.map((screen, i) => {
      const itemClasses = cx(styles.item, {
        [styles.itemInactive]: i !== index,
      });
      return (
        <div
          key={`item-${i}`}
          className={itemClasses}
          onClick={() => setUrl(getUrl(screen), screen)}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems(this.props.screenOrder)}
      </div>
    );
  }
}

pureRender(Navigation);
