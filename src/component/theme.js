import StyleSheet from './styles';

const theme = {
  fontFamily: 'Helvetica, sans-serif',
  fontWeight: '100',
  backgroundColor: 'rgb(199, 223, 255)',
  inactiveBackgroundColor: 'rgba(199, 223, 255, 0.1)',
  highlightColor: '#c7dfff',
  primaryBorderColor: '#c7dfff',
  secondaryBorderColor: '#c7dfff',
  textColor: '#c7dfff',
  inverseTextColor: '#415793',
  baseBorderRadius: 3,
  itemHeight: 58,
  media: {
    biggerPhones: '@media screen and (min-width: 360px)',
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
