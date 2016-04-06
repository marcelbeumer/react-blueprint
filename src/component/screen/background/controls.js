// @flow
import React from 'react';
import pureRender from '../../pure-render';
import StyleSheet from '../../styles';

const styles = StyleSheet.create({
  backgroundControls: {
    flex: '0 0 100px',
    padding: '68px 0 0 0',
    textAlign: 'center',
  },
});

export default class ScreenBackgroundControls extends React.Component {
  props: {
    children?: any,
  };
  render() {
    return <div className={styles.backgroundControls}>{this.props.children}</div>;
  }
}

pureRender(ScreenBackgroundControls);
