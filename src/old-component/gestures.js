// @flow
import React from 'react';
import Hammer from 'react-hammerjs';
import pureRender from './pure-render';

const { assign } = Object;
const hammerOptions = {
  recognizers: {
    pan: {
      threshold: 0,
    },
  },
};

export default class Gestures extends React.Component {
  props: {
    options?: Object,
  };

  componentWillMount() {
    this.wrapHandlers(this.props);
  }

  componentWillUpdate(nextProps: Object) {
    this.wrapHandlers(nextProps);
  }

  wrappedHandlers: Object = {};
  hammerDelta: Object = {};

  wrapHandlers(props: Object) {
    const wrapped = this.wrappedHandlers;
    const propNames = Object.keys(props);
    const deltaEvents = propNames.filter(name => /^on(Pan)$/.test(name));
    const endEvents = propNames.map(name => `${name}End`);
    const allEvents = [...deltaEvents, ...endEvents];

    Object.keys(wrapped).forEach(name => {
      if (allEvents.indexOf(name) === -1) {
        delete wrapped[name];
      }
    });

    deltaEvents.forEach(name => {
      if (!wrapped[name]) {
        wrapped[name] = e => this.handleDeltaEvent(e, name);
      }
    });

    endEvents.forEach(name => {
      if (!wrapped[name]) {
        wrapped[name] = e => this.handleEndEvent(e, name);
      }
    });
  }

  handleDeltaEvent(e: Object, name: string) {
    // $FlowFixMe
    assign(document.body.style, {
      userSelect: 'none',
      WebkitUserSelect: 'none',
    });

    const event = e;
    if (!this.hammerDelta[name]) this.hammerDelta[name] = { x: 0, y: 0 };
    const delta = this.hammerDelta[name];
    const deltaX = e.deltaX - delta.x;
    const deltaY = e.deltaY - delta.y;
    delta.x = e.deltaX;
    delta.y = e.deltaY;
    event.eventDeltaX = deltaX;
    event.eventDeltaY = deltaY;
    if (this.props[name]) this.props[name](event);
  }

  handleEndEvent(e: Object, name: string) {
    // $FlowFixMe
    assign(document.body.style, {
      userSelect: null,
      WebkitUserSelect: null,
    });

    delete (this.hammerDelta || {})[name];
    if (this.props[name]) this.props[name](e);
  }

  render() {
    const options = assign({}, hammerOptions, this.props.options);
    return <Hammer {...this.props} {...this.wrappedHandlers} options={options} />;
  }
}

pureRender(Gestures);
