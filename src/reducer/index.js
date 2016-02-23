/* eslint no-nested-ternary:0 */
import { generateDots, generateBars  } from '../data/util';

export default function reducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_GREETING' ? state.set('greeting', payload) :
    type === 'GENERATE_DOTS' ? state.set('dots', generateDots(state.get('dots').count())) :
    type === 'GENERATE_BARS' ? state.set('bars', generateBars(state.get('bars').count())) :
    state;
}
