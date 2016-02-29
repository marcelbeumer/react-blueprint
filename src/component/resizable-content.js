import React from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import { DraggableCore } from 'react-draggable';
import StyleSheet from './styles';
import theme from './theme';

const { any, number, func } = React.PropTypes;
const { max } = Math;

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    border: `1px solid ${theme.primaryBorderColor}`,
    overflow: 'hidden',
    padding: '10px',
  },
  handle: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    textAlign: 'center',
    cursor: 'pointer',
    borderTop: `1px solid ${theme.primaryBorderColor}`,
    color: theme.secondaryBorderColor,
    backgroundColor: theme.backgroundColor,
    ':after': {
      display: 'inline-block',
      content: '"="',
      transform: 'scaleX(10) scaleY(0.8)',
    },
  },
});

@pureRender
export default class ResizableContent extends React.Component {

  static propTypes = {
    children: any,
    height: number,
    onResize: func,
  }

  static defaultProps = {
    onResize: () => null,
  }

  @autobind
  onDrag(e, ui) {
    const { top: rootTop } = this.root.getBoundingClientRect();
    const { height: handleHeight } = this.handle.getBoundingClientRect();
    const { clientY } = ui.position;
    const value = clientY - rootTop;
    this.props.onResize(max(handleHeight, value));
  }

  @autobind
  onRootRef(root) {
    this.root = root;
  }

  @autobind
  onHandleRef(handle) {
    this.handle = handle;
  }

  render() {
    const { height } = this.props;
    const style = {
      height: `${height}px`,
    };
    return (
      <DraggableCore handle={`.${styles.handle}`} onDrag={this.onDrag}>
        <div className="resizable-content" ref={this.onRootRef} style={style}>
          {this.props.children}
          <div className={styles.handle} ref={this.onHandleRef} />
        </div>
      </DraggableCore>
    );
  }
}
