// @flow
import React from 'react';
import ViewSwitcher from '../base/ViewSwitcher';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import pureRender from '../enhancer/pureRender';

const screens = ['home', 'second', 'third'];

const PureHomeScreen = pureRender()(HomeScreen);
const PureSecondScreen = pureRender()(SecondScreen);
const PureThirdScreen = pureRender()(ThirdScreen);

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
