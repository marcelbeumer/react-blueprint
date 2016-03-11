import React from 'react';
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

export default function ScreenBackgroundControls(props) {
  return <div className={styles.backgroundControls}>{props.children}</div>;
}

ScreenBackgroundControls.propTypes = {
  children: any,
};
