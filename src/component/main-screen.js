/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import refHandler from './ref-handler';
import HomeScreen from './home-screen';
import TestScreen from './test-screen';
import StyleSheet from './styles';

const { object, string } = React.PropTypes;

const segueTransition = 'transform 3s ease-in';

export const styles = StyleSheet.create({
  root: {
  },
  segueRoot: {
    position: 'absolute',
    width: '100%',
    overflowX: 'hidden',
  },
  segueFromRight: {
    transition: segueTransition,
    position: 'relative',
    left: '100%',
    transform: 'translateX(-100%)',
  },
  segueFromLeft: {
    transition: segueTransition,
    position: 'relative',
    left: '-100%',
    width: '100%',
    transform: 'translateX(100%)',
  },
  segueToLeft: {
    transition: segueTransition,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transform: 'translateX(-100%)',
    zIndex: 99,
  },
  segueToRight: {
    transition: segueTransition,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    transform: 'translateX(100%)',
    zIndex: 99,
  },
});

@pureRender
export default class MainScreen extends React.Component {

  static propTypes = {
    actions: object,
    screen: string,
  }

  state = {};

  componentDidMount() {
    this._root.addEventListener('transitionend', this.stopSegue);
    this._root.addEventListener('transitioncancel', this.stopSegue);
  }

  componentWillReceiveProps(nextProps) {
    const screenOrder = this.getScreenOrder();

    if (nextProps.screen !== this.props.screen) {
      Object.assign(this.state, { // no-render
        segue: true,
        segueDir:
          screenOrder.indexOf(nextProps.screen) >
          screenOrder.indexOf(this.props.screen) ? 1 : -1,
        lastScreen: this.props.screen,
      });
    }
  }

  getScreenOrder() {
    return ['home', 'test'];
  }

  getScreenComponent(name) {
    return name === 'home' ? HomeScreen :
      name === 'test' ? TestScreen :
      undefined;
  }

  refRoot = refHandler(this, '_root');

  @autobind
  stopSegue() {
    if (this.state.segue) {
      this.setState({
        segue: false,
      });
    }
  }

  render() {
    const { screen } = this.props;
    const { lastScreen, segue, segueDir } = this.state;
    const Screen = this.getScreenComponent(screen);
    const LastScreen = lastScreen && this.getScreenComponent(lastScreen);

    const lastScreenClasses = cx(styles.screen, {
      [segueDir > 0 ? styles.segueToLeft : styles.segueToRight]: segue,
    });

    const screenClasses = cx(styles.screen, {
      [segueDir > 0 ? styles.segueFromRight : styles.segueFromLeft]: segue,
    });

    return (
      <div ref={this.refRoot}
        className={cx(styles.root, { [styles.segueRoot]: segue })}>
        <div className={lastScreenClasses}>
          {lastScreen && segue && <LastScreen {...this.props} />}
        </div>
        <div className={screenClasses}>
          {<Screen {...this.props} />}
        </div>
      </div>
    );
  }
}
