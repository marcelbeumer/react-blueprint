import React from 'react';
import { memoize } from 'lodash';
import pureRender from 'pure-render-decorator';
import cx from 'classnames';
import screens from './screens';
import StyleSheet, { em } from '../styles';
import theme from '../theme';

const { assign } = Object;
const { bool, func, string } = React.PropTypes;
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

@pureRender
export default class SceneNavigation extends React.Component {

  static propTypes = {
    screen: string,
    arrows: bool,
    setUrl: func,
    getUrl: func,
  }

  static defaultProps = {
    screen: '',
    arrows: false,
  }

  getScreenIndex(screen) {
    return screens.map(item => item.name).indexOf(screen);
  }

  getItemHandler = memoize(name => () => {
    const { setUrl, getUrl } = this.props;
    setUrl(getUrl(name), name);
  })

  renderItems() {
    const { screen: currentScreen } = this.props;
    const index = this.getScreenIndex(currentScreen);
    return screens.map((screen, i) => {
      const itemClasses = cx(styles.item, {
        [styles.itemActive]: i === index,
      });
      return (
        <div key={`item-${i}`} className={itemClasses}
          onClick={this.getItemHandler(screen.name)}
        >
          {screen.label}
        </div>
      );
    });
  }

  renderArrow(label, indexOffset) {
    const { screen } = this.props;
    const index = this.getScreenIndex(screen);
    const arrowIndex = index + indexOffset;
    const item = screens[arrowIndex];
    return (
      <div key={`${label}-arrow`}
        className={cx(styles[`${label}Arrow`], !item && styles.inactiveArrow)}
        onClick={item && this.getItemHandler(item.name)}
      />
    );
  }

  render() {
    const { arrows } = this.props;
    return (
      <div className={styles.root}>
        {arrows && this.renderArrow('prev', -1)}
        {this.renderItems()}
        {arrows && this.renderArrow('next', 1)}
      </div>
    );
  }
}
