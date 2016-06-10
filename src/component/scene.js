// @flow
import React from 'react';
import cx from 'classnames';
import { List } from 'immutable';
import { TransitionMotion, spring } from 'react-motion';
import pureRender from './pure-render';
import StyleSheet from './styles';
import Navigation from './navigation';
import HomeScreen from './screen/home';
import SecondScreen from './screen/second';
import ThirdScreen from './screen/third';
import Toggle from './toggle';
import theme from './theme';
import type { listType } from './types';

const screenConfig: Array<Object> = [
  { key: 'home', component: HomeScreen },
  { key: 'second', component: SecondScreen },
  { key: 'third', component: ThirdScreen },
];

const screenOrder: List<string> = new List([
  'home', 'second', 'third',
]);

export const styles = StyleSheet.create({
  scene: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '16px',
    lineHeight: '20px',
  },
  topControls: {
    minWidth: '320px',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
  },
  storeButtons: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 0 30px 0',
  },
  storeButtonsInner: {
    minWidth: 150,
  },
  motionScreenContainer: {
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
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

const storeToggleValues = [
  { value: 'rxjs', label: 'RxJS' },
  { value: 'redux', label: 'Redux' },
];

export default class Scene extends React.Component {
  props: {
    actions: Object,
    screen: string,
    store: string,
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
    <div>
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
    const inMotion = offset !== 0;
    const innerStyle = inMotion ? { transform: `translate3d(${offset * 100}%, 0, 0)` } : undefined;
    const Screen = screenConfig.find(item => item.key === key).component;

    return (
      <div key={key} className={cx(inMotion && styles.motionScreenContainer)}>
        <div className={cx(inMotion && styles.motionScreen)} style={innerStyle}>
          <Screen {...this.props} />
        </div>
      </div>
    );
  }

  render() {
    const { actions, screen, store, services } = this.props;

    return (
      <div className={styles.scene}>
        <div className={styles.topControls}>
          <div className={styles.storeButtons}>
            <div className={styles.storeButtonsInner}>
              <Toggle value={store} values={storeToggleValues} onChange={actions.setStore} />
            </div>
          </div>

          <div className={styles.navigation}>
            <Navigation
              screen={screen}
              setUrl={actions.setUrl}
              getUrl={services.getUrl}
              screenOrder={screenOrder}
            />
          </div>
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
