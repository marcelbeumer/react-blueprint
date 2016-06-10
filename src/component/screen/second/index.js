// @flow
import React from 'react';
import pureRender from '../../pure-render';
import Screen from '..';
import StyleSheet from '../../styles';

const styles = StyleSheet.create({
  content: {
    fontSize: '5em',
    fontWeight: 'bold',
    lineHeight: '1.1em',
  },
  note: {
    margin: '1em 0',
    fontStyle: 'italic',
  },
});

export default class SecondScreen extends React.Component {
  render() {
    return (
      <Screen {...this.props}>
        <div className={styles.content}>
          Page 2
        </div>
        <div className={styles.note}>
          more coming soon...
        </div>
      </Screen>
    );
  }
}

pureRender(SecondScreen);
