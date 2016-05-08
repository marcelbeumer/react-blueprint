// @flow
/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import { TransitionMotion, spring } from 'react-motion';
import pureRender from '../pure-render';
import StyleSheet from '../styles';
import SceneNavigation, { SceneNavigationItem } from './navigation';
import { SegueContainer, SegueFixed, SegueScreen } from './segue';
import HomeScreen from '../screen/home';
import SecondScreen from '../screen/second';
import ThirdScreen from '../screen/third';
import theme from '../theme';
import type { listType } from '../types';

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
  segueRoot: {
    width: '100%',
  },
  segueContainer: {
    position: 'relative',
    width: '100%',
    whiteSpace: 'nowrap',
    verticalAlign: 'top',
  },
  segueScreen: {
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

  getScreenStyles: Function = () : Array<Object> => [
    {
      key: this.props.screen,
      style: {
        offset: spring(0),
      },
    },
  ];

  getDefaultScreenStyles: Function = () : Array<Object> => [
    {
      key: this.props.screen,
      style: {
        offset: 0,
      },
    },
  ];

  componentWillReceiveProps(nextProps: Object) {
    this.lastScreen = this.props.screen;
  }

  screenWillLeave: Function = (item: Object) : Object => {
    const index = this.screenOrder.indexOf(item.key);
    const propIndex = this.screenOrder.indexOf(this.props.screen);
    const offset = spring(index > propIndex ? 1 : -1);
    return { offset };
  };

  screenWillEnter: Function = (item: Object) : Object => {
    const index = this.screenOrder.indexOf(item.key);
    const propIndex = this.screenOrder.indexOf(this.lastScreen);
    const offset = index > propIndex ? 1 : -1;
    return { offset };
  };

  screenOrder: any = [
    'home', 'second', 'third',
  ];

  screenMap: Object = {
    home: HomeScreen,
    second: SecondScreen,
    third: ThirdScreen,
  };

  handleTransitionMotion: Function = interpolatedStyles =>
    <div className={styles.segueContainer}>
      {interpolatedStyles.map(({ key, style }) => this.renderScreen(key, style))}
    </div>;

  getScreenComponent(key: String) {
    return this.screenMap[key];
  }

  renderScreen(key: String, style: Object) {
    const Screen = this.getScreenComponent(key);
    const { offset } = style;
    const divProps = {};

    if (offset !== 0) {
      divProps.style = { transform: `translateX(${offset * 100}%)` };
      divProps.className = styles.segueScreen;
      // console.log(key, divProps.transform);
    }

    return (
      <div key={key} {...divProps}>
        <Screen {...this.props} />
      </div>
    );
  }

  render() {
    const { actions, screen, showBackground, services } = this.props;

    return (
      <div className={styles.segueRoot}>
        <SegueFixed>
          <div className={cx(styles.navigation, showBackground && styles.navigationUp)}>
            <SceneNavigation
              screen={screen}
              setUrl={actions.setUrl}
              getUrl={services.getUrl}
              inverse={showBackground}
            >
              <SceneNavigationItem name="home" />
              <SceneNavigationItem name="second" />
              <SceneNavigationItem name="third" />
            </SceneNavigation>
          </div>
        </SegueFixed>
        <TransitionMotion
          styles={this.getScreenStyles()}
          defaultStyles={this.getDefaultScreenStyles()}
          willLeave={this.screenWillLeave}
          willEnter={this.screenWillEnter}
        >
          {this.handleTransitionMotion}
        </TransitionMotion>
      </div>
    );
  }
}

pureRender(Scene);
