import React from 'react';
import { memoize } from 'lodash';
import ImmutablePropTypes from 'react-immutable-proptypes';
import cx from 'classnames';
import screens from './screens';
import StyleSheet, { em } from '../styles';
import theme from '../theme';

const { assign } = Object;
const { bool, string, shape, func } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const itemSize = 1;
const itemMargin = Math.round((itemSize / 6) * 10) / 10;

const arrowStyle = {
  display: 'inline-block',
  margin: `0 ${itemMargin * 5}em`,
  border: `${itemSize / 2}em solid transparent`,
  cursor: 'pointer',
  transform: 'scaleX(2)',
};

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
    margin: `0 ${itemMargin}em`,
    cursor: 'pointer',
    transition: 'background-color 0.3s linear',
  },
  prevArrow: assign({}, arrowStyle, {
    borderRightColor: theme.highlightColor,
  }),
  nextArrow: assign({}, arrowStyle, {
    borderLeftColor: theme.highlightColor,
  }),
  inactiveArrow: {
    cursor: 'default',
    opacity: 0.5,
  },
  itemActive: {
    backgroundColor: theme.highlightColor,
  },
});

export default function SceneNavigation(props) {
  function getScreenIndex(screen) {
    return screens.map(item => item.name).indexOf(screen);
  }

  const getItemHandler = memoize(screen => () => props.onChange(screen));

  function renderItems() {
    const { screen: currentScreen } = props;
    const index = getScreenIndex(currentScreen);
    return screens.map((screen, i) => {
      const itemClasses = cx(styles.item, {
        [styles.itemActive]: i === index,
      });
      return (
        <div key={`item-${i}`} className={itemClasses}
          onClick={getItemHandler(screen.name)}
        >
          {screen.label}
        </div>
      );
    });
  }

  function renderArrow(label, indexOffset) {
    const { screen } = props;
    const index = this.getScreenIndex(screen);
    const arrowIndex = index + indexOffset;
    const item = screens[arrowIndex];
    return (
      <div key={`${label}-arrow`}
        className={cx(styles[`${label}Arrow`], !item && styles.inactiveArrow)}
        onClick={item && getItemHandler(item.name)}
      />
    );
  }

  const { arrows } = props;
  return (
    <div className={styles.root}>
      {arrows && renderArrow('prev', -1)}
      {renderItems()}
      {arrows && renderArrow('next', 1)}
    </div>
  );
}

SceneNavigation.propTypes = {
  items: listOf(shape({
    screen: string,
    label: string,
  })),
  screen: string,
  arrows: bool,
  onChange: func,
};

SceneNavigation.defaultProps = {
  screen: '',
  onChange: () => null,
  arrows: false,
};
