/* eslint no-nested-ternary:0 */
import React from 'react';
import cx from 'classnames';
import pureRender from '../pure-render';
import StyleSheet from '../styles';
import SceneNavigation, { SceneNavigationItem } from './navigation';
import { SegueContainer, SegueFixed, SegueScreen } from './segue';
import HomeScreen from '../screen/home';
import SecondScreen from '../screen/second';
import ThirdScreen from '../screen/third';
import theme from '../theme';

const { object, string, bool } = React.PropTypes;

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

export default class Scene extends React.Component {
  static propTypes = {
    actions: object,
    screen: string,
    showBackground: bool,
    services: object,
  }

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
