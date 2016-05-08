// @flow
import React from 'react';
import cx from 'classnames';
import pureRender from '../../pure-render';
import StyleSheet from '../../styles';
import theme from '../../theme';
export { default as ScreenBackgroundContent } from './content';
export { default as ScreenBackgroundControls } from './controls';

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    display: 'none',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'auto',
    textAlign: 'center',
    color: theme.inverseTextColor,
  },
  backgroundShown: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default class ScreenBackground extends React.Component {
  props: {
    showBackground: boolean,
    children?: any,
  };

  render() {
    const { showBackground } = this.props;
    return (
      <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
        {this.props.children}
      </div>
    );
  }
}

pureRender(ScreenBackground);
