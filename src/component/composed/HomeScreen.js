// @flow
import React from 'react';
import View from '../base/View';
import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import ProgressBar from '../base/ProgressBar';
import GithubIcon from '../base/GithubIcon';
import PageNavigation from '../connected/PageNavigation';
import LoadMoreListItemsButton from '../connected/LoadMoreListItemsButton';
import ResizableItemList from '../composed/ResizableItemList';
import listEndModifier from '../connector/listEndModifier';
import listStartModifier from '../connector/listStartModifier';
import listRangeModifier from '../connector/listRangeModifier';
import withListLoadingProgressAsValue from '../connector/withListLoadingProgressAsValue';
import withClassName from '../enhancer/withClassName';
import StyleSheet from '../styles';
import { styles as linkStyles } from '../visualizer/link';

const githubHref = 'https://github.com/marcelbeumer/react-blueprint';

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
  navigationSection: {
    margin: '2em 0',
  },
  githubIconLink: {
    display: 'inline-block',
    width: '48px',
    margin: '0 5px',
  },
});

const Container = withClassName(styles.container)(View);
const NavigationSection = withClassName(styles.navigationSection)(View);
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
        <NavigationSection>
          <PageNavigation />
        </NavigationSection>
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
        <Section>
          <a className={styles.githubIconLink} href={githubHref}>
            <GithubIcon />
          </a>
        </Section>
        <Section>
          <a className={linkStyles.link} href={githubHref}>
            marcelbeumer/react-blueprint
          </a>
        </Section>
      </Content>
    </Container>
  );
}
