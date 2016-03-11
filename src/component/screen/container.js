import React from 'react';
import StyleSheet from '../styles';
import theme from '../theme';

const { any } = React.PropTypes;

const styles = StyleSheet.create({
  root: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '12px',
    lineHeight: '16px',
    [theme.media.fromTablet]: {
      fontSize: '14px',
      lineHeight: '18px',
    },
    [theme.media.fromDesktop]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
});

export default function HomeScreen(props) {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  );
}

HomeScreen.propTypes = {
  children: any,
};
