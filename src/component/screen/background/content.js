import React from 'react';
import StyleSheet from '../../styles';

const { any } = React.PropTypes;

const styles = StyleSheet.create({
  backgroundContent: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
  },
});

export default function ScreenBackgroundContent(props) {
  return <div className={styles.backgroundContent}>{props.children}</div>;
}

ScreenBackgroundContent.propTypes = {
  children: any,
};
