// @flow
import React from 'react';
import ViewSwitcher from '../base/ViewSwitcher';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import withState from '../connector/withState';

const screens = ['home', 'second', 'third'];

 // Prevent re-render by connecting to top level state
const PureHomeScreen = withState()(HomeScreen);
const PureSecondScreen = withState()(SecondScreen);
const PureThirdScreen = withState()(ThirdScreen);

const getScreen = (name) => (
  name === 'home' ? <PureHomeScreen /> :
  name === 'second' ? <PureSecondScreen /> :
  name === 'third' ? <PureThirdScreen /> :
  undefined
);

const getDirection = (previous, next) => {
  const previousIndex = screens.indexOf(previous);
  const nextIndex = screens.indexOf(next);
  return nextIndex > previousIndex ? 1 :
    previousIndex > nextIndex ? -1 :
    0;
};

export default ({ name }: { name: string } = {}) => (
  <ViewSwitcher name={name} direction={getDirection}>
    {(screenName) => getScreen(screenName)}
  </ViewSwitcher>
);
