// @flow
import React from 'react';
import StyleSheet from '../styles';

const styles = StyleSheet.create({
  hugeHeader: {
    fontSize: '8em',
    lineHeight: '1em',
    fontWeight: 'bold',
  },
});

const HugeHeader = ({children, ...others}: { children?: any }) => (
  <header {...others} className={styles.hugeHeader}>
    {children}
  </header>
);

export default HugeHeader;
