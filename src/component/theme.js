import StyleSheet from './styles';

const theme = {
  fontFamily: 'Helvetica, sans-serif',
  fontWeight: '100',
  backgroundColor: '#415793',
  highlightColor: '#c7dfff',
  primaryBorderColor: '#c7dfff',
  secondaryBorderColor: '#c7dfff',
  textColor: '#c7dfff',
  inverseTextColor: '#415793',
  baseBorderRadius: 3,
  media: {
    fromTablet: '@media screen and (min-width: 600px)',
    fromDesktop: '@media screen and (min-width: 800px)',
  },
};

// Workaround to force media queries to proper order
StyleSheet.create({
  __: Object.keys(theme.media).reduce((p, c, i) => {
    const rules = p;
    rules[theme.media[c]] = { fontSize: i };
    return rules;
  }, {}),
});

export default theme;
