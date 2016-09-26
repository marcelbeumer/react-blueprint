// @flow
import React from 'react';
import View from '../base/View';
import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import ProgressBar from '../base/ProgressBar';
import PageNavigation from '../connected/PageNavigation';
import LoadMoreListItemsButton from '../connected/LoadMoreListItemsButton';
import ResizableItemList from '../composed/ResizableItemList';
import listEndModifier from '../connector/listEndModifier';
import listStartModifier from '../connector/listStartModifier';
import listRangeModifier from '../connector/listRangeModifier';
import withListLoadingProgressAsValue from '../connector/withListLoadingProgressAsValue';
import withClassName from '../enhancer/withClassName';
import StyleSheet from '../styles';

// import GithubIcon from '../base/GithubIcon';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    width: '320px',
  },
  section: {
    margin: '1em 0',
  },
});

const Container = withClassName(styles.container)(View);
const Section = withClassName(styles.section)(View);
const Content = withClassName(styles.content)(View);
const ListEndBarMeter = listEndModifier()(BarMeter);
const ListStartBarMeter = listStartModifier()(BarMeter);
const ListRangeSlider = listRangeModifier()(Slider);
const ListLoadingProgressBar = withListLoadingProgressAsValue()(ProgressBar);

export default function HomeScreen() {
  return (
    <Container>
      <Content>
        <Section>
          <PageNavigation />
        </Section>
        <Section>
          <ListStartBarMeter />
          <ListEndBarMeter />
        </Section>
        <Section>
          <ListRangeSlider />
        </Section>
        <Section>
          <ResizableItemList />
        </Section>
        <Section>
          <LoadMoreListItemsButton>More</LoadMoreListItemsButton>
        </Section>
        <Section>
          <ListLoadingProgressBar />
        </Section>
      </Content>
    </Container>
  );
}
