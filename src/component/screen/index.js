// @flow
import React from 'react';
import pureRender from '../pure-render';
import StyleSheet from '../styles';
import theme from '../theme';

const styles = StyleSheet.create({
  screen: {
    zIndex: 1,
    width: '100%',
    minWidth: '320px',
    minHeight: '100vh',
    margin: '0 auto',
    transform: 'translateZ(0)',
    color: theme.textColor,
    textAlign: 'center',
    paddingTop: '110px',
  },
});

export default class ScreenForeground extends React.Component {
  render() {
    return <div {...this.props} className={styles.screen} />;
  }
}

pureRender(ScreenForeground);
