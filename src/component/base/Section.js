// @flow
import React from 'react';
import StyleSheet from '../styles';

const styles = StyleSheet.create({
  section: {
    margin: '1em 0',
  },
});

const Section = (props: Object) => <section {...props} className={styles.section} />;

export default Section;
