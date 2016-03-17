import React from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import refHandler from './ref-handler';
import StyleSheet, { px } from './styles';
import Hammer from 'react-hammerjs';
import theme from './theme';

const { any, number, func } = React.PropTypes;
const { max } = Math;

const scrollbarStyle = {
  msOverflowStyle: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
};

const hammerOptions = {
  recognizers: {
    pan: {
      threshold: 0,
    },
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

  state = {};

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
  onPan(e) {
    const { fromPx } = this.props;
    const { top: rootTop } = this._content.getBoundingClientRect();
    const { height: handleHeight } = this._handle.getBoundingClientRect();
    const { clientY } = e.pointers[0];
    const value = clientY - rootTop;
    this.setState({ panning: true });
    this.props.onResize(fromPx(max(handleHeight, value)));
  }

  @autobind
  onPanEnd() {
    this.setState({ panning: false });
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

  refContent = refHandler(this, '_content');
  refInnerContent = refHandler(this, '_innerContent');
  refScrollBarSizer = refHandler(this, '_scrollBarSizer');
  refHandle = refHandler(this, '_handle');

  render() {
    const { height, scrollTop, toUnit } = this.props;
    const userSelect = this.state.panning ? 'none' : 'text';

    const rootStyle = {
      userSelect,
      WebkitUserSelect: userSelect,
    };

    const contentStyle = {
      height: toUnit(height),
    };

    const innerContentStyle = {
      position: 'relative',
      top: this._usesScrollTop ? 0 : `-${toUnit(scrollTop)}`,
    };

    return (
      <div className={styles.root} style={rootStyle}>
        <div className={styles.scrollbarSizer} ref={this.refScrollBarSizer} />
        <div ref={this.refContent}
          className={styles.content}
          style={contentStyle}
        >
          <div ref={this.refInnerContent} style={innerContentStyle}>
            {this.props.children}
          </div>
        </div>
        <Hammer
          vertical
          options={hammerOptions}
          onPan={this.onPan}
          onPanEnd={this.onPanEnd}
        >
          <div className={styles.handle} ref={this.refHandle} />
        </Hammer>
      </div>
    );
  }
}
