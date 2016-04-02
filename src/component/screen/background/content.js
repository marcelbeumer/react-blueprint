import React from 'react';
import pureRender from '../../pure-render';
import StyleSheet from '../../styles';

const { any } = React.PropTypes;

const styles = StyleSheet.create({
  backgroundContent: {
    flex: '1 1 100%',
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
    padding: '0 30px',
    overflow: 'auto',
  },
});

export default class ScreenBackgroundContent extends React.Component {
  static propTypes = {
    children: any,
  }
  render() {
    return <div className={styles.backgroundContent}>{this.props.children}</div>;
  }
}

pureRender(ScreenBackgroundContent);
