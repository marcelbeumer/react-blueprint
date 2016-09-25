// @flow
import React from 'react';
import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import PageNavigation from '../connected/PageNavigation';
import listEndModifier from '../enhancer/listEndModifier';
import listStartModifier from '../enhancer/listStartModifier';
import listRangeModifier from '../enhancer/listRangeModifier';
import withClassName from '../enhancer/withClassName';
import StyleSheet from '../styles';

// import ResizableContent from '../base/ResizableContent';
// import LabelBox from '../base/LabelBox';
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

const Container = withClassName(styles.container)();
const Section = withClassName(styles.section)();
const Content = withClassName(styles.content)();

const ListEndBarMeter = listEndModifier(BarMeter);
const ListStartBarMeter = listStartModifier(BarMeter);
const ListRangeSlider = listRangeModifier(Slider);

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
      </Content>
    </Container>
  );
}
