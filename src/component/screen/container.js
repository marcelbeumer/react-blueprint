import React from 'react';
import pureRender from '../pure-render';
import StyleSheet from '../styles';
import theme from '../theme';

const { array } = React.PropTypes;

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

export default class ScreenContainer extends React.Component {
  static propTypes = {
    children: array,
  }

  render() {
    return (
      <div className={styles.root}>
        {this.props.children}
      </div>
    );
  }
}

pureRender(ScreenContainer);
