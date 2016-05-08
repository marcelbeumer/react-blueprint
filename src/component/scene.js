// @flow
/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import { TransitionMotion, spring } from 'react-motion';
import pureRender from './pure-render';
import StyleSheet from './styles';
import Navigation, { NavigationItem } from './navigation';
import HomeScreen from './screen/home';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import theme from './theme';
import type { listType } from './types';

const screenConfig: Array<Object> = [
  { key: 'home', component: HomeScreen },
  { key: 'second', component: SecondScreen },
  { key: 'third', component: ThirdScreen },
];

export const styles = StyleSheet.create({
  navigation: {
    minWidth: '320px',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    transition: 'all 0.3s ease-in',
    top: '20px',
    [theme.media.fromTablet]: {
      top: '60px',
    },
    [theme.media.fromDesktop]: {
      top: '120px',
    },
  },
  navigationUp: {
    top: '38px',
    [theme.media.fromTablet]: {
      top: '38px',
    },
    [theme.media.fromDesktop]: {
      top: '38px',
    },
  },
  screensContainer: {
  },
  stillScreenContainer: {
  },
  stillScreen: {
  },
  motionScreenContainer: {
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    overflowX: 'hidden',
    top: 0,
    left: 0,
  },
  motionScreen: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
});

export default class Scene extends React.Component {
  props: {
    actions: Object,
    screen: string,
    showBackground: boolean,
    services: Object,
    list: listType,
  };

  state: Object = {
    lastScreen: null,
  };

  motionStyles: Function = () => [
    { key: this.props.screen, style: { offset: spring(0) } },
  ];

  willLeave: Function = item => ({
    offset: spring(this.getScreenDirection(this.props.screen, item.key)),
  });

  willEnter: Function = item => ({
    offset: this.getScreenDirection(this.state.lastScreen, item.key),
  });

  renderMotion: Function = interpolatedStyles =>
    <div className={styles.screensContainer}>
      {interpolatedStyles.map(({ key, style }) => this.renderScreen(key, style))}
    </div>;

  componentWillReceiveProps() {
    this.state.lastScreen = this.props.screen;
  }

  getScreenDirection(from: string, to: string) {
    const fromIndex = screenConfig.findIndex(item => item.key === from);
    const toIndex = screenConfig.findIndex(item => item.key === to);
    return toIndex > fromIndex ? 1 :
      fromIndex > toIndex ? -1 :
      0;
  }

  renderScreen(key: string, { offset }: Object) {
    const Screen = screenConfig.find(item => item.key === key).component;
    const inMotion = offset !== 0;
    const containerClass = inMotion ? styles.motionScreenContainer : styles.stillScreenContainer;
    const innerClass = inMotion ? styles.motionScreen : styles.stillScreen;
    const innerStyle = inMotion ? { transform: `translate3d(${offset * 100}%, 0, 0)` } : undefined;

    return (
      <div key={key} className={containerClass}>
        <div className={innerClass} style={innerStyle}>
          <Screen {...this.props} />
        </div>
      </div>
    );
  }

  render() {
    const { actions, screen, showBackground, services } = this.props;

    return (
      <div>
        <div className={cx(styles.navigation, showBackground && styles.navigationUp)}>
          <Navigation
            screen={screen}
            setUrl={actions.setUrl}
            getUrl={services.getUrl}
            inverse={showBackground}
          >
            <NavigationItem name="home" />
            <NavigationItem name="second" />
            <NavigationItem name="third" />
          </Navigation>
        </div>
        <TransitionMotion
          styles={this.motionStyles()}
          willLeave={this.willLeave}
          willEnter={this.willEnter}
        >
          {this.renderMotion}
        </TransitionMotion>
      </div>
    );
  }
}

pureRender(Scene);
