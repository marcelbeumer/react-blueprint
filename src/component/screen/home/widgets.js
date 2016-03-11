import React from 'react';
import { range } from 'lodash';
import { List } from 'immutable';
import Slider, { SliderGrippy } from '../../slider';
import BarMeter, { BarMeterItem } from '../../bar-meter';
import ItemList from '../../item-list';
import ResizableContent from '../../resizable-content';
import StyleSheet, { em, resolveMedia } from '../../styles';
import theme from '../../theme';
import { listType } from '../../types';

const { object } = React.PropTypes;

const styles = StyleSheet.create({
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

export default function HomeScreenWidgets(props) {
  const { actions, list } = props;

  function onStartChange(value) {
    actions.setListStart(value * list.length);
  }

  function onEndChange(value) {
    actions.setListEnd(value * list.length);
  }

  function onListResize(height) {
    actions.setListEnd(list.start + height);
  }

  function onListScroll(scrollTop) {
    const items = list.end - list.start;
    const start = scrollTop;
    const end = start + items;
    actions.setListRange(start, end);
  }

  function getFontSizeContainerPx() {
    const resolved = resolveMedia(styles.getStyles().fontSizeContainer);
    return parseInt(resolved.fontSize, 10);
  }

  function fromPx(px) {
    return px / getFontSizeContainerPx();
  }

  function toPx(val) {
    return val * getFontSizeContainerPx();
  }

  const length = list.length;
  const startRatio = list.start / list.length;
  const endRatio = list.end / list.length;

  const listItems = new List(range(length).map(num => String(num)));
  const listHeight = (endRatio - startRatio) * length;
  const scrollTop = list.start;

  return (
    <div>
      <BarMeter>
        <BarMeterItem value={startRatio} onChange={onStartChange} />
        <BarMeterItem value={endRatio} onChange={onEndChange} />
      </BarMeter>
      <Slider>
        <SliderGrippy value={startRatio} onChange={onStartChange} />
        <SliderGrippy value={endRatio} onChange={onEndChange} />
      </Slider>
      <div className={styles.fontSizeContainer}>
        <ResizableContent
          height={listHeight}
          scrollTop={scrollTop}
          onResize={onListResize}
          onScroll={onListScroll}
          toUnit={em}
          fromPx={fromPx}
          toPx={toPx}
        >
          <ItemList items={listItems} />
        </ResizableContent>
      </div>
    </div>
  );
}


HomeScreenWidgets.propTypes = {
  actions: object,
  list: listType,
};
