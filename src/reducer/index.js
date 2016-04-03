// @flow
import Collection from 'immutable';
import screenReducer from './screen';
import backgroundReducer from './background';
import listReducer from './list';

export default function reducer(state: Collection, action: Object = {}): Collection {
  return [
    screenReducer,
    backgroundReducer,
    listReducer,
  ].reduce((lastState, currentReducer) =>
    currentReducer(lastState, action), state);
}
