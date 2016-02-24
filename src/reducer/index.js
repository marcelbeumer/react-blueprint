/* eslint no-nested-ternary:0 */
import { generateDots, generateBars } from '../data/util';

function updateSliders(state, { index, value }) {
  return state.set('sliders', state.get('sliders').set(index, value));
}

export default function reducer(state, action = {}) {
  const { type, payload } = action;
  return type === 'SET_GREETING' ? state.set('greeting', payload) :
    type === 'GENERATE_DOTS' ? state.set('dots', generateDots(state.get('dots').count())) :
    type === 'GENERATE_BARS' ? state.set('bars', generateBars(state.get('bars').count())) :
    type === 'UPDATE_SLIDERS' ? updateSliders(state, payload) :
    state;
}
