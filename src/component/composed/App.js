// @flow
import React from 'react';
import View from '../base/View';
import HeadSection from '../base/HeadSection';
import withClassName from '../enhancer/withClassName';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import PageNavigation from '../connected/PageNavigation';
import StyleSheet from '../styles';
import theme from '../theme';

export const styles = StyleSheet.create({
  root: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
  },
  topControls: {
    minWidth: '320px',
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    top: '50px',
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

const Root = withClassName(styles.root)(View);

const App = () => (
  <Root>
    <HeadSection>
      <PageNavigation />
    </HeadSection>
    <HomeScreen />
  </Root>
);

export default App;
