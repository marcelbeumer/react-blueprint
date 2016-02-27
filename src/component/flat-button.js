import React from 'react';
import pureRender from 'pure-render-decorator';
import color from 'color';
import StyleSheet from './styles';
import theme from './theme';

const hoverColor = color(theme.highlightColor).darken(0.2).rgbString();
const activeColor = color(theme.highlightColor).darken(0.3).rgbString();

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.highlightColor,
    color: theme.inverseTextColor,
    borderRadius: 2,
    padding: '5px 7px',
    border: 0,
    fontSize: '0.9em',
    fontFamily: 'inherit',
    outline: '0',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: hoverColor,
    },
    ':active': {
      backgroundColor: activeColor,
    },
  },
});

@pureRender
export default class FlatButton extends React.Component {
  render() {
    const { props } = this;
    return (
      <button {...props} className={styles.button}>
        {props.children}
      </button>
    );
  }
}
