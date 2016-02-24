import React from 'react';
import pureRender from 'pure-render-decorator';
import autobind from 'autobind-decorator';
import { DraggableCore } from 'react-draggable';

const { any, number, func } = React.PropTypes;
const { max } = Math;

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
      <DraggableCore handle=".resizable-content--handle" onDrag={this.onDrag}>
        <div className="resizable-content" ref={this.onRootRef} style={style}>
          {this.props.children}
          <div className="resizable-content--handle" ref={this.onHandleRef}/>
        </div>
      </DraggableCore>
    );
  }
}
