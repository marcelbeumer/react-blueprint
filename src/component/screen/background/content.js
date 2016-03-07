import React from 'react';
import pureRender from 'pure-render-decorator';
import StyleSheet from '../../styles';

const { any } = React.PropTypes;

const styles = StyleSheet.create({
  backgroundContent: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
  },
});

@pureRender
export default class ScreenBackgroundContent extends React.Component {
  static propTypes = {
    children: any,
  }
  render() {
    return <div className={styles.backgroundContent}>{this.props.children}</div>;
  }
}
