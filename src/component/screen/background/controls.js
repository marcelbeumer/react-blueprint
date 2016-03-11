import React from 'react';
import pureRender from 'pure-render-decorator';
import StyleSheet from '../../styles';

const { any } = React.PropTypes;

const styles = StyleSheet.create({
  backgroundControls: {
    position: 'fixed',
    top: '50px',
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
});

@pureRender
export default class ScreenBackgroundControls extends React.Component {
  static propTypes = {
    children: any,
  }
  render() {
    return <div className={styles.backgroundControls}>{this.props.children}</div>;
  }
}
