// @flow
import React from 'react';
import StyleSheet, { px } from '../styles';

const scrollbarStyle: Object = {
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

export const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  content: scrollbarStyle,
  scrollbarSizer: Object.assign({
    position: 'absolute',
    top: '-9999px',
    width: '100px',
    height: '100px',
    overflow: 'scroll',
  }, scrollbarStyle),
});

export default class Scrollable extends React.Component {
  props: {
    children?: any,
    height?: string,
    scrollTop: number,
    onScroll: Function,
  };

  _isMounted: boolean;
  _content: Object;
  _scrollBarSizer: Object;

  static defaultProps = {
    scrollTop: 0,
    height: '0px',
    onScroll: () => null,
  };

  componentDidMount() {
    this._content.style.marginRight = px(-this.getScrollbarWidth());
    this._content.style.overflow = 'auto';
    this._content.style.top = 0;
    this._content.style.height = this.props.height;
    this._isMounted = true;
    this._content.onscroll = this.onScroll;
    this._content.scrollTop = this.props.scrollTop;
  }

  componentDidUpdate() {
    this._content.scrollTop = this.props.scrollTop;
  }

  onScroll: Function = () => {
    const scrollTop = this._content.scrollTop;
    if (scrollTop !== Math.floor(this.props.scrollTop)) {
      this.props.onScroll(scrollTop);
    }
  };

  getScrollbarWidth(): number {
    const el = this._scrollBarSizer;
    return el.offsetWidth - el.clientWidth;
  }

  render() {
    const { height, scrollTop } = this.props;
    const rootStyle = { height };
    const contentStyle = {
      position: 'relative',
      height: this._isMounted ? height : 'auto',
      top: this._isMounted ? 0 : `-${scrollTop}px`,
    };

    return (
      <div className={styles.root} style={rootStyle}>
        <div
          className={styles.scrollbarSizer}
          ref={el => { this._scrollBarSizer = el; }}
        />
        <div
          ref={el => { this._content = el; }}
          className={styles.content}
          style={contentStyle}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
