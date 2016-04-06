// @flow
import React from 'react';
import pureRender from './pure-render';
import refHandler from './ref-handler';
import StyleSheet, { px } from './styles';
import Gestures from './gestures';
import theme from './theme';

const { max } = Math;

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
  content: Object.assign({
    overflow: 'hidden',
    borderBottom: `1px solid ${theme.highlightColor}`,
  }, scrollbarStyle),
  handle: {
    cursor: 'pointer',
    width: px(60),
    height: px(15),
    margin: '0 auto',
    backgroundColor: theme.highlightColor,
    borderRadius: `0 0 ${theme.baseBorderRadius}px ${theme.baseBorderRadius}px`,
  },
  scrollbarSizer: Object.assign({
    position: 'absolute',
    top: '-9999px',
    width: '100px',
    height: '100px',
    overflow: 'scroll',
  }, scrollbarStyle),
});

export default class ResizableContent extends React.Component {
  props: {
    children?: any,
    height?: number,
    scrollTop: number,
    onResize: Function,
    onScroll: Function,
    toUnit: Function,
    fromPx: Function,
    toPx: Function,
  };

  _usesScrollTop: boolean;
  _content: Object;
  _innerContent: Object;
  _scrollBarSizer: Object;
  _handle: Object;
  refContent: Function = refHandler(this, '_content');
  refInnerContent: Function = refHandler(this, '_innerContent');
  refScrollBarSizer: Function = refHandler(this, '_scrollBarSizer');
  refHandle: Function = refHandler(this, '_handle');

  static defaultProps = {
    scrollTop: 0,
    onResize: () => null,
    onScroll: () => null,
    toUnit: px,
    fromPx: val => val,
    toPx: val => val,
  };

  componentDidMount() {
    const { toPx } = this.props;
    this._content.onscroll = this.onScroll;
    this._content.style.marginRight = px(-this.getScrollbarWidth());
    this._content.style.overflow = 'auto';
    this._usesScrollTop = true;
    this._innerContent.style.top = 0;
    this._content.scrollTop = toPx(this.props.scrollTop);
  }

  componentDidUpdate() {
    const { toPx } = this.props;
    this._content.scrollTop = toPx(this.props.scrollTop);
  }

  onDrag: Function = (e: Object, ui: Object) => {
    const { fromPx } = this.props;
    const { top: rootTop } = this._content.getBoundingClientRect();
    const { height: handleHeight } = this._handle.getBoundingClientRect();
    const { clientY } = ui.position;
    const value = clientY - rootTop;
    this.props.onResize(fromPx(max(handleHeight, value)));
  };

  onPan: Function = (e: Object) => {
    const { fromPx } = this.props;
    const { top: rootTop } = this._content.getBoundingClientRect();
    const { height: handleHeight } = this._handle.getBoundingClientRect();
    const { clientY } = e.pointers[0];
    const value = clientY - rootTop;
    this.props.onResize(fromPx(max(handleHeight, value)));
  };

  onScroll: Function = () => {
    const { fromPx } = this.props;
    const scrollTop = fromPx(this._content.scrollTop);
    if (scrollTop !== Math.floor(this.props.scrollTop)) {
      this.props.onScroll(scrollTop);
    }
  };

  getScrollbarWidth(): number {
    const el = this._scrollBarSizer;
    return el.offsetWidth - el.clientWidth;
  }

  render() {
    const { height, scrollTop, toUnit } = this.props;
    const contentStyle = {
      height: toUnit(height),
    };
    const innerContentStyle = {
      position: 'relative',
      top: this._usesScrollTop ? 0 : `-${toUnit(scrollTop)}`,
    };

    return (
      <div className={styles.root}>
        <div className={styles.scrollbarSizer} ref={this.refScrollBarSizer} />
        <div ref={this.refContent}
          className={styles.content}
          style={contentStyle}
        >
          <div ref={this.refInnerContent} style={innerContentStyle}>
            {this.props.children}
          </div>
        </div>
        <Gestures vertical onPan={this.onPan}>
          <div className={styles.handle} ref={this.refHandle} />
        </Gestures>
      </div>
    );
  }
}

pureRender(ResizableContent);
