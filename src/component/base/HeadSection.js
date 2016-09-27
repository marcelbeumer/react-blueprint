// @flow
import React from 'react';
import StyleSheet from '../styles';

const styles = StyleSheet.create({
  headSection: {
    margin: '2em 0 1em 0',
  },
});

const HeadSection = (props: Object) => <section {...props} className={styles.headSection} />;

export default HeadSection;
