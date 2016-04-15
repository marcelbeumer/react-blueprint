import shallowCompare from 'react-addons-shallow-compare';

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}

export default function pureRender(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate; // eslint-disable-line no-param-reassign, max-len
}
