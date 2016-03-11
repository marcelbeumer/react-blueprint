import React from 'react';
import cx from 'classnames';
import StyleSheet from '../../styles';
import theme from '../../theme';
export ScreenBackgroundContent from './content';
export ScreenBackgroundControls from './controls';

const { any, bool } = React.PropTypes;

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
  backgroundShown: {
    display: 'block',
  },
});

export default function ScreenBackground(props) {
  const { showBackground } = props;
  return (
    <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
      {props.children}
    </div>
  );
}

ScreenBackground.propTypes = {
  children: any,
  showBackground: bool,
};
