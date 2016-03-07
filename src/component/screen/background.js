import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import StyleSheet from '../styles';
import theme from '../theme';

const { array, bool } = React.PropTypes;

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'auto',
    padding: '90px 30px',
    textAlign: 'center',
    color: theme.inverseTextColor,
  },
  backgroundContent: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
  },
  backgroundShown: {
    display: 'block',
  },
  backgroundControls: {
    position: 'fixed',
    top: '50px',
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
});

@pureRender
export default class ScreenBackground extends React.Component {

  static propTypes = {
    children: array,
    showBackground: bool,
  }

  render() {
    const { showBackground } = this.props;
    return (
      <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
        {this.props.children}
      </div>
    );
  }
}

@pureRender
export class ScreenBackgroundControls extends React.Component {
  render() {
  }
}

@pureRender
export class ScreenBackgroundContent extends React.Component {
  render() {
  }
}

