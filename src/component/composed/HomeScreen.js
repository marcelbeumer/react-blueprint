// @flow
import React from 'react';
import { compose } from 'redux';
import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import PageNavigation from '../connected/PageNavigation';
import listEndModifier from '../enhancer/listEndModifier';
import listStartModifier from '../enhancer/listStartModifier';
import listRangeModifier from '../enhancer/listRangeModifier';
import withClassName from '../enhancer/withClassName';
import listOfItems from '../enhancer/listOfItems';
import withListAsItems from '../enhancer/withListAsItems';
import StyleSheet, { px } from '../styles';
import theme from '../theme';

// import ResizableContent from '../base/ResizableContent';
import LabelBox from '../base/LabelBox';
import ListContainer from '../base/ListContainer';
import PaddedListItem from '../base/PaddedListItem';
// import ProgressBar from '../base/ProgressBar';
// import GithubIcon from '../base/GithubIcon';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '320px',
  },
  section: {
    margin: '1em 0',
  },
});

const itemFactory = (item) => (
  <PaddedListItem key={item} height={px(theme.itemHeight)}>
    <LabelBox value={item} />
  </PaddedListItem>
);

const Container = withClassName(styles.container)();
const Section = withClassName(styles.section)();
const Content = withClassName(styles.content)();
const ListEndBarMeter = listEndModifier()(BarMeter);
const ListStartBarMeter = listStartModifier()(BarMeter);
const ListRangeSlider = listRangeModifier()(Slider);
const ItemList = compose(
  withListAsItems(),
  listOfItems(itemFactory),
)(ListContainer);

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
          <ItemList />
        </Section>
      </Content>
    </Container>
  );
}
