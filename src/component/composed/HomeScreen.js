// @flow
import React from 'react';
import View from '../base/View';
import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import ResizableHeight from '../base/ResizableHeight';
import PageNavigation from '../connected/PageNavigation';
import ItemList from '../connected/ItemList';
import listEndModifier from '../connector/listEndModifier';
import listHeightResizer from '../connector/listHeightResizer';
import listStartModifier from '../connector/listStartModifier';
import listRangeModifier from '../connector/listRangeModifier';
import withClassName from '../enhancer/withClassName';
import StyleSheet from '../styles';
import theme from '../theme';

// import ResizableContent from '../base/ResizableContent';
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

const Container = withClassName(styles.container)(View);
const Section = withClassName(styles.section)(View);
const Content = withClassName(styles.content)(View);
const ListEndBarMeter = listEndModifier()(BarMeter);
const ListStartBarMeter = listStartModifier()(BarMeter);
const ListRangeSlider = listRangeModifier()(Slider);
const ListResizableHeight = listHeightResizer({
  unitSize: theme.itemHeight,
})(ResizableHeight);

// type BaseItemListContainerPropTypes = {
//   children: any,
//   handle: Element,
//   style?: Object,
// };

// const BaseItemListContainer = ({ x, y, z}) => (
//   <ResizableHeight height={}>
//     <Scrollable scrollOffset={}>
//       {props.children}
//     </Scrollable>
//   </ResizableHeight>
// );

// const BaseItemListContainer = (props: BaseItemListContainerPropTypes) => (
//   <View style={props.style}>
//     {props.children}
//     {props.handle}
//   </View>
// );

// const ItemListContainer = compose(
//   withListAsScrollOffset(),
//   withListAsHeight(),
//   resizableHeight(Handle),
//   scrollable(),
// )(BaseItemListContainer);

const ItemListContainer = View;

export default function HomeScreen() {
  return (
    <Container>
      <Content>
        <Section>
          <ListResizableHeight />
        </Section>
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
          <ItemListContainer>
            <ItemList />
          </ItemListContainer>
        </Section>
      </Content>
    </Container>
  );
}
