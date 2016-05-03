// @flow
/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender, { pureFnRender } from '../pure-render';
import StyleSheet from '../styles';
import SceneNavigation, { SceneNavigationItem } from './navigation';
import { SegueContainer, SegueFixed, SegueScreen } from './segue';
import HomeScreen from '../screen/home';
import SecondScreen from '../screen/second';
import ThirdScreen from '../screen/third';
import theme from '../theme';

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
});

class RenderTestClassBased extends React.Component {
  props: {
    actions: Object,
  };

  render() {
    console.log('RenderTestClassBased render');
    return <div>...</div>;
  }
}

pureRender(RenderTestClassBased);

const RenderTestPureFunction = (props: Object) => {
  console.log('RenderTestPureFunction render'); // always re-renders :-(
  return <div>...</div>;
};

const RenderTestPureFunctionOptimized = pureFnRender((props: Object) => {
  console.log('RenderTestPureFunctionOptimized render');
  return <div>...</div>;
});

export default class Scene extends React.Component {
  props: {
    actions: Object,
    screen: string,
    showBackground: boolean,
    services: Object,
  };

  render() {
    const { actions, screen, showBackground, services } = this.props;

    return (
      <SegueContainer {...this.props} animate={!showBackground}>
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
            <RenderTestClassBased actions={actions} />
            <RenderTestPureFunction actions={actions} />
            <RenderTestPureFunctionOptimized actions={actions} />
          </div>
        </SegueFixed>
        <SegueScreen name="home" component={HomeScreen} />
        <SegueScreen name="second" component={SecondScreen} />
        <SegueScreen name="third" component={ThirdScreen} />
      </SegueContainer>
    );
  }
}

pureRender(Scene);
