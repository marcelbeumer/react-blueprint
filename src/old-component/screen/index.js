// @flow
import React from 'react';
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
    paddingTop: '130px',
  },
});

const Screen = (props: { children?: any }) =>
  <div className={styles.screen}>{props.children}</div>;

export default Screen;
