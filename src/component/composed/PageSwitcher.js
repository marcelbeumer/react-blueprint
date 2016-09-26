// @flow
import React from 'react';
import ViewSwitcher from '../base/ViewSwitcher';
import HomeScreen from './HomeScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';

const screens = ['home', 'second', 'third'];

const getScreen = (name) => (
  name === 'home' ? HomeScreen :
  name === 'second' ? SecondScreen :
  name === 'third' ? ThirdScreen :
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
