import React from 'react';
import cx from 'classnames';
import pureRender from '../pure-render';
import StyleSheet from '../styles';
import theme from '../theme';

const { array, bool } = React.PropTypes;

const styles = StyleSheet.create({
  foreground: {
    minWidth: '320px',
    minHeight: '100vh',
    margin: '0 auto',
    width: '100%',
    backgroundColor: theme.backgroundColor,
    transform: 'translateZ(0)',
    color: theme.textColor,
    textAlign: 'center',
    paddingTop: '60px',
    transition: 'transform 0.3s ease-in',
    [theme.media.fromTablet]: {
      paddingTop: '100px',
    },
    [theme.media.fromDesktop]: {
      paddingTop: '160px',
    },
  },
  foregroundOpen: {
    position: 'absolute',
    width: '100%',
    transform: 'translateZ(0) scale(0.8, 0.8) translate(0, -110%)',
  },
});

export default class ScreenForeground extends React.Component {
  static propTypes = {
    children: array,
    showBackground: bool,
  }

  render() {
    const { showBackground } = this.props;
    return (
      <div className={cx(styles.foreground, { [styles.foregroundOpen]: showBackground })}>
        {this.props.children}
      </div>
    );
  }
}

pureRender(ScreenForeground);
