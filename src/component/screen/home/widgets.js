// @flow
import React from 'react';
import range from 'lodash/range';
import { List } from 'immutable';
import pureRender from '../../pure-render';
import Slider, { SliderGrippy } from '../../slider';
import BarMeter, { BarMeterItem } from '../../bar-meter';
import ItemList from '../../item-list';
import ResizableContent from '../../resizable-content';
import Button from '../../button';
import LoadingIndicator from '../../loading-indicator';
import StyleSheet, { em, resolveMedia } from '../../styles';
import theme from '../../theme';
import type { listType } from '../../types';

const styles = StyleSheet.create({
  p: {
    margin: '20px 0',
  },
  fontSizeContainer: {
    fontSize: '40px',
    [theme.media.biggerPhones]: {
      fontSize: '60px',
    },
    [theme.media.fromDesktop]: {
      fontSize: '60px',
    },
  },
});

export default class HomeScreenWidgets extends React.Component {
  props: {
    actions: Object,
    list: listType,
    listLoading: boolean,
    listLoadingProgress: number,
  };

  onStartChange: Function = (value: number) => {
    const { actions, list } = this.props;
    actions.setListStart(value * list.length);
  };

  onEndChange: Function = (value: number) => {
    const { actions, list } = this.props;
    actions.setListEnd(value * list.length);
  };

  onListResize: Function = (height: number) => {
    const { actions, list } = this.props;
    actions.setListEnd(list.start + height);
  };

  onListScroll: Function = (scrollTop: number) => {
    const { actions, list } = this.props;
    const items = list.end - list.start;
    const start = scrollTop;
    const end = start + items;
    actions.setListRange(start, end);
  };

  getFontSizeContainerPx(): number {
    const resolved = resolveMedia(styles.getStyles().fontSizeContainer);
    return parseInt(resolved.fontSize, 10);
  }

  fromPx: Function = (px: number) => px / this.getFontSizeContainerPx();
  toPx: Function = (val: number) => val * this.getFontSizeContainerPx();

  render() {
    const { list, listLoading, listLoadingProgress, actions } = this.props;
    const length = list.length;
    const startRatio = list.start / list.length;
    const endRatio = list.end / list.length;

    const listItems = new List(range(length).map(num => String(num)));
    const listHeight = (endRatio - startRatio) * length;
    const scrollTop = list.start;

    return (
      <div>
        <BarMeter>
          <BarMeterItem value={startRatio} onChange={this.onStartChange} />
          <BarMeterItem value={endRatio} onChange={this.onEndChange} />
        </BarMeter>
        <Slider>
          <SliderGrippy value={startRatio} onChange={this.onStartChange} />
          <SliderGrippy value={endRatio} onChange={this.onEndChange} />
        </Slider>
        <div className={styles.fontSizeContainer}>
          <ResizableContent
            height={listHeight}
            scrollTop={scrollTop}
            onResize={this.onListResize}
            onScroll={this.onListScroll}
            toUnit={em}
            fromPx={this.fromPx}
            toPx={this.toPx}
          >
            <ItemList items={listItems} />
          </ResizableContent>
        </div>
        <div className={styles.p}>
          <Button
            active={!listLoading}
            onClick={!listLoading && actions.loadMoreListItems}
          >
            More
          </Button>
        </div>
        <div className={styles.p}>
          <LoadingIndicator active={listLoading} progress={listLoadingProgress} />
        </div>
      </div>
    );
  }
}

pureRender(HomeScreenWidgets);
