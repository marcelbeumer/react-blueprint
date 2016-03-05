import React from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import refs from './refs-decorator';
import { DraggableCore } from 'react-draggable';
import StyleSheet, { px } from './styles';
import theme from './theme';

const { any, number, func } = React.PropTypes;
const { max } = Math;

const scrollbarStyle = {
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

@refs
@pureRender
export default class ResizableContent extends React.Component {

  static propTypes = {
    children: any,
    height: number,
    scrollTop: number,
    onResize: func,
    onScroll: func,
    toUnit: func,
    fromPx: func,
    toPx: func,
  }

  static defaultProps = {
    scrollTop: 0,
    onResize: () => null,
    onScroll: () => null,
    toUnit: px,
    fromPx: val => val,
    toPx: val => val,
  }

  componentDidMount() {
    const { toPx } = this.props;
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

  @autobind
  onDrag(e, ui) {
    const { fromPx } = this.props;
    const { top: rootTop } = this._content.getBoundingClientRect();
    const { height: handleHeight } = this._handle.getBoundingClientRect();
    const { clientY } = ui.position;
    const value = clientY - rootTop;
    this.props.onResize(fromPx(max(handleHeight, value)));
  }

  @autobind
  onScroll() {
    const { fromPx } = this.props;
    const scrollTop = fromPx(this._content.scrollTop);
    if (scrollTop !== Math.floor(this.props.scrollTop)) {
      this.props.onScroll(scrollTop);
    }
  }

  getScrollbarWidth() {
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
      <DraggableCore handle={`.${styles.handle}`} onDrag={this.onDrag}>
        <div className={styles.root}>
          <div className={styles.scrollbarSizer} ref={this.onRef('_scrollBarSizer')} />
          <div ref={this.onRef('_content')}
            className={styles.content}
            style={contentStyle}
            onScroll={this.onScroll}>
            <div ref={this.onRef('_innerContent')} style={innerContentStyle}>
              {this.props.children}
            </div>
          </div>
          <div className={styles.handle} ref={this.onRef('_handle')} />
        </div>
      </DraggableCore>
    );
  }
}
