import React from 'react';
import cx from 'classnames';
import {TransitionMotion, spring} from 'react-motion';
import StyleSheet from '../styles';

export const styles = StyleSheet.create({
  root: {
  },
  motionScreenContainer: {
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    left: 0,
  },
  motionScreen: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
});

export default class ViewSwitcher extends React.Component {
  props: {
    name: any,
    direction: Function,
    children: Function,
  }

  state: Object = {
    lastName: null,
  };

  componentWillReceiveProps() {
    this.state.lastName = this.props.name; // eslint-disable-line react/no-direct-mutation-state
  }

  motionStyles: Function = () => [
    {key: this.props.name, style: {offset: spring(0)}},
  ];

  willLeave: Function = item => ({
    offset: spring(this.props.direction(this.props.name, item.key)),
  });

  willEnter: Function = item => ({
    offset: this.props.direction(this.state.lastName, item.key),
  });

  renderMotion: Function = interpolatedStyles =>
    <div>
      {interpolatedStyles.map(({key, style}) => this.renderScreen(key, style))}
    </div>;

  renderScreen(key: string, {offset}: Object) {
    const inMotion = offset !== 0;
    const innerStyle = inMotion ? {transform: `translate3d(${offset * 100}%, 0, 0)`} : undefined;

    return (
      <div key={key} className={cx(inMotion && styles.motionScreenContainer)}>
        <div className={cx(inMotion && styles.motionScreen)} style={innerStyle}>
          {this.props.children(key)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <TransitionMotion
        styles={this.motionStyles()}
        willLeave={this.willLeave}
        willEnter={this.willEnter}
      >
        {this.renderMotion}
      </TransitionMotion>
    );
  }
}
