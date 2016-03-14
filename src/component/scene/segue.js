/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import refHandler from '../ref-handler';
import StyleSheet from '../styles';
import raf from '../../raf';
import { easeInQuad as easing } from 'penner';

const screensPerSecond = 0.3;
const { min, max } = Math;
const { string, bool, any } = React.PropTypes;
const { requestAnimationFrame, cancelAnimationFrame } = raf();

export const styles = StyleSheet.create({
  root: {
  },
  container: {
  },
  screen: {
  },
  segueRoot: {
    width: '100%',
    overflowX: 'hidden',
  },
  segueContainer: {
    position: 'relative',
    width: '100%',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
  },
  segueScreen: {
    verticalAlign: 'top',
    display: 'inline-block',
    width: '100%',
  },
});

export const SegueFixed = props => props.children;
export const SegueScreen = () => null;

SegueScreen.propTypes = {
  name: string,
  component: any,
};

@pureRender
export class SegueContainer extends React.Component {

  static propTypes = {
    screen: string,
    animate: bool,
    children: any,
  }

  state = this.getCleanState();

  componentWillReceiveProps(nextProps) {
    if (!nextProps.screen) return;

    if (!this.props.animate) {
      this.stopAnimations();
      this.state = this.getCleanState(nextProps);
    } else {
      const targetScreen = nextProps.screen;
      const screens = this.getScreens();
      const screenOrder = screens.map(screen => screen.name);
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
  }

  getCleanState(props = this.props) {
    return {
      offset: 0,
      easeOffset: 0,
      visibleScreens: [props.screen],
      currentScreen: props.screen,
      targetScreen: props.screen,
    };
  }

  getScreens() {
    const screens = [];
    React.Children.map(this.props.children, child => {
      if (child.type === SegueScreen) {
        screens.push({
          name: child.props.name,
          component: child.props.component,
        });
      }
    });
    return screens;
  }

  refRoot = refHandler(this, '_root');
  refContainer = refHandler(this, '_container');

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


  stopAnimations() {
    cancelAnimationFrame(this._rafHandle);
  }

  renderScreens() {
    const { visibleScreens } = this.state;
    const screens = this.getScreens();
    const segue = visibleScreens.length > 1;

    return visibleScreens.map((screenName, i) => {
      const [{ component: Screen }] = screens.filter(screen => screen.name === screenName);
      return (
        <div className={cx(styles.screen, segue && styles.segueScreen)} key={`screen-${i}`}>
          <Screen {...this.props} />
        </div>
      );
    });
  }

  renderFixed() {
    return React.Children.map(this.props.children, child =>
      child.type === SegueFixed ? React.cloneElement(child) : null);
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
      <div ref={this.refRoot} className={cx(styles.root, segue && styles.segueRoot)}>
        {this.renderFixed()}
        <div
          ref={this.refContainer}
          className={cx(styles.container, segue && styles.segueContainer)}
          style={containerStyle}
        >
          {this.renderScreens()}
        </div>
      </div>
    );
  }
}
