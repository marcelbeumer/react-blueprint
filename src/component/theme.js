import StyleSheet from './styles';

const theme = {
  fontFamily: 'Helvetica, sans-serif',
  fontWeight: '100',
  backgroundColor: '#fff',
  highlightColor: '#000',
  primaryBorderColor: '#000',
  secondaryBorderColor: '#000',
  textColor: '#000',
  inverseTextColor: '#fff',
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
