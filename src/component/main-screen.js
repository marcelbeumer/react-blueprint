/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import refHandler from './ref-handler';
import HomeScreen from './home-screen';
import TestScreen from './test-screen';
import StyleSheet from './styles';
import raf from '../raf';
import { easeInQuad as easing } from 'penner';

const screensPerSecond = 0.3;
const { min, max } = Math;
const { object, string } = React.PropTypes;
const { requestAnimationFrame, cancelAnimationFrame } = raf();

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

    this.stopAnimations();
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

  stopAnimations() {
    cancelAnimationFrame(this._rafHandle);
  }

  animateToTargetScreen() {
    const duration = screensPerSecond * 1000;
    const { offset, currentScreen, targetScreen, visibleScreens } = this.state;
    const targetOffset = visibleScreens.indexOf(targetScreen) -
      visibleScreens.indexOf(currentScreen);
    const delta = targetOffset - offset;

    let start;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const passed = timestamp - start;
      const position = passed / duration;
      const easePosition = easing(position, 0, 1, 1);
      let updatedOffset;
      let updatedEaseOffset;

      if (position >= 1) {
        updatedOffset = targetOffset;
        updatedEaseOffset = targetOffset;
      } else {
        const limit = targetOffset < offset ? max : min;
        updatedOffset = limit(targetOffset, offset + (position * delta));
        updatedEaseOffset = limit(targetOffset, offset + (easePosition * delta));
      }

      if (this.state.offset !== targetOffset) {
        this.setState({
          offset: updatedOffset,
          easeOffset: updatedEaseOffset,
        });
        this._rafHandle = requestAnimationFrame(step);
      } else {
        this.setState(this.getCleanState());
      }
    };

    this._rafHandle = requestAnimationFrame(step);
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
    const { easeOffset, visibleScreens, currentScreen } = this.state;
    const segue = visibleScreens.length > 1;
    const translateX = -((visibleScreens.indexOf(currentScreen) + easeOffset) * 100);
    const containerStyle = {};

    if (segue) {
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
