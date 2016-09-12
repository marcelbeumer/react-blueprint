// @flow
import React from 'react';
import Hammer from 'react-hammerjs';

/* eslint-disable no-param-reassign */
function getEventWithDelta(event: Object, cache: Object): Object {
  if (cache.x == null) cache.x = 0;
  if (cache.y == null) cache.y = 0;

  const deltaX = event.deltaX - cache.x;
  const deltaY = event.deltaY - cache.y;
  cache.x = event.deltaX;
  cache.y = event.deltaY;

  return Object.assign(Object.create(event), {
    eventDeltaX: deltaX,
    eventDeltaY: deltaY,
  });
}
/* eslint-enable no-param-reassign */

function wrapHandlers(props, eventCache) {
  const wrapped = {};
  if (props.onPan) {
    wrapped.onPan = (e: Object): any => props.onPan(getEventWithDelta(e, eventCache));
  }
  return wrapped;
}

class Gestures extends React.Component {
  _eventCache = {};
  _wrappedHandlers = null;

  componentWillMount() {
    this._wrappedHandlers = wrapHandlers(this.props, this._eventCache);
  }

  componentWillUpdate(nextProps: Object) {
    this._wrappedHandlers = wrapHandlers(nextProps, this._eventCache);
  }

  render() {
    const props = Object.assign({}, this.props, this._wrappedHandlers);
    return <Hammer {...props} />;
  }
}

export default Gestures;
