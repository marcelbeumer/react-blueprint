import shallowCompare from 'react-addons-shallow-compare';

function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}

export default function pureRender(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate; // eslint-disable-line no-param-reassign, max-len
}

export function pureFnRender(fn) {
  let lastProps;
  let lastRender;

  return props => {
    const fakeInstance = { props: lastProps };
    if (!lastRender || shallowCompare(fakeInstance, props)) {
      lastProps = props;
      lastRender = fn(props);
    }
    return lastRender;
  };
}
