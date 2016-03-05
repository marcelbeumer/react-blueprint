/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import refHandler from './ref-handler';
import HomeScreen from './home-screen';
import TestScreen from './test-screen';
import StyleSheet from './styles';
import raf from '../raf';

const { min, max } = Math;
const { object, string } = React.PropTypes;
const { requestAnimationFrame } = raf();

export const styles = StyleSheet.create({
  segueRoot: {
    width: '100%',
    overflowX: 'hidden',
  },
  segueContainer: {
    display: 'flex',
    width: '100%',
  },
  segueScreen: {
    flex: '1 0 100%',
  },
});

@pureRender
export default class MainScreen extends React.Component {

  static propTypes = {
    actions: object,
    screen: string,
  }

  constructor(props) {
    super(props);

    this.offsetRaf = null;
    this.state = this.getCleanState();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.screen) return;

    const targetScreen = nextProps.screen;
    const screenOrder = this.getScreenOrder();
    const { currentScreen, visibleScreens } = this.state;

    this.state.targetScreen = targetScreen;

    if (visibleScreens.indexOf(targetScreen) === -1) {
      visibleScreens[
        screenOrder.indexOf(targetScreen) > screenOrder.indexOf(currentScreen) ?
        'push' : 'unshift'
      ](targetScreen);
    }

    this.animateToTargetScreen();
  }

  getCleanState() {
    return {
      offset: 0,
      visibleScreens: [this.props.screen],
      currentScreen: this.props.screen,
      targetScreen: this.props.screen,
    };
  }

  getScreenOrder() {
    return ['test', 'home'];
  }

  getScreenComponent(name) {
    return name === 'home' ? HomeScreen :
      name === 'test' ? TestScreen :
      undefined;
  }

  animateToTargetScreen() {
    this._animate = true;
    const screensPerSecond = 1.5;
    let lastTimestamp;

    const step = (timestamp) => {
      const passed = (timestamp - (lastTimestamp || timestamp)) / 1000;
      const delta = passed * screensPerSecond;
      lastTimestamp = timestamp;

      const { offset, currentScreen, targetScreen, visibleScreens } = this.state;
      const targetOffset = visibleScreens.indexOf(targetScreen) -
        visibleScreens.indexOf(currentScreen);

      if (offset !== targetOffset) {
        const updatedOffset = targetOffset < offset ?
          max(targetOffset, offset - delta) :
          min(targetOffset, offset + delta);
        this.setState({ offset: updatedOffset });
        requestAnimationFrame(step);
      } else {
        this.setState(this.getCleanState());
      }
    };

    requestAnimationFrame(step);
  }

  refRoot = refHandler(this, '_root');
  refContainer = refHandler(this, '_container');

  renderScreens() {
    const { visibleScreens } = this.state;
    const segue = visibleScreens.length > 1;

    const screens = visibleScreens.map((screenName, i) => {
      const Screen = this.getScreenComponent(screenName);
      return (
        <div className={cx(segue && styles.segueScreen)} key={`screen-${i}`}>
          <Screen {...this.props} />
        </div>
      );
    });

    return screens;
  }

  render() {
    const { offset, visibleScreens, currentScreen } = this.state;
    const segue = visibleScreens.length > 1;
    const translateX = -((visibleScreens.indexOf(currentScreen) + offset) * 100);
    const containerStyle = {};

    if (translateX !== 0) {
      containerStyle.transform = `translateX(${translateX}%)`;
    }

    return (
      <div ref={this.refRoot} className={cx(segue && styles.segueRoot)}>
        <div
          ref={this.refContainer}
          className={cx(segue && styles.segueContainer)}
          style={containerStyle}>
          {this.renderScreens()}
        </div>
      </div>
    );
  }
}
