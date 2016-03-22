import React from 'react';
import Hammer from 'react-hammerjs';

const { object } = React.PropTypes;
const hammerOptions = {
  recognizers: {
    pan: {
      threshold: 0,
    },
  },
};

export default class Gestures extends React.Component {
  static propTypes = {
    options: object,
  }

  componentWillMount() {
    this.wrapProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.wrapProps(nextProps);
  }

  wrapProps(props) {
    const wrapped = {};
    const propNames = Object.keys(props);
    const deltaEvents = propNames.filter(name => /^on(Pan)$/.test(name));
    const endEvents = propNames.map(name => `${name}End`);

    deltaEvents.forEach(name => {
      wrapped[name] = e => this.handleDeltaEvent(e, name, props[name]);
    });

    endEvents.forEach(name => {
      wrapped[name] = e => this.handleEndEvent(e, name, props[name]);
    });

    this.wrappedProps = wrapped;
  }

  handleDeltaEvent(e, name, handler) {
    Object.assign(document.body.style, {
      userSelect: 'none',
      WebkitUserSelect: 'none',
    });

    const event = e;
    if (!this._hammerDelta) this._hammerDelta = {};
    if (!this._hammerDelta[name]) this._hammerDelta[name] = { x: 0, y: 0 };
    const delta = this._hammerDelta[name];
    const deltaX = e.deltaX - delta.x;
    const deltaY = e.deltaY - delta.y;
    delta.x = e.deltaX;
    delta.y = e.deltaY;
    event.eventDeltaX = deltaX;
    event.eventDeltaY = deltaY;
    if (handler) handler(event);
  }

  handleEndEvent(e, name, handler) {
    Object.assign(document.body.style, {
      userSelect: null,
      WebkitUserSelect: null,
    });

    delete (this._hammerDelta || {})[name];
    if (handler) handler(e);
  }

  render() {
    const options = Object.assign({}, hammerOptions, this.props.options);
    return <Hammer {...this.props} {...this.wrappedProps} options={options} />;
  }
}
