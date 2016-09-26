// @flow
import React from 'react';
import View from '../base/View';
import HeadSection from '../base/HeadSection';
import PageSwitcher from '../connected/PageSwitcher';
import PageNavigation from '../connected/PageNavigation';
import withClassName from '../enhancer/withClassName';
import StyleSheet from '../styles';
import theme from '../theme';

export const styles = StyleSheet.create({
  root: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
  },
});

const Root = withClassName(styles.root)(View);

const App = () => (
  <Root>
    <HeadSection>
      <PageNavigation />
    </HeadSection>
    <PageSwitcher />
  </Root>
);

export default App;
