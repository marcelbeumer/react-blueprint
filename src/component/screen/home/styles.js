import StyleSheet from '../../styles';
import theme from '../../theme';

const websiteIconShared = {
  display: 'inline-block',
  position: 'relative',
  width: '48px',
  margin: '0 5px',
};

const styles = StyleSheet.create({
  widgets: {
    margin: '0 auto',
    padding: '0px 20px 0 20px',
    [theme.media.biggerPhones]: {
      maxWidth: '354px',
    },
  },
  sites: {
    margin: '50px 0 15px 0',
  },
  githubIcon: websiteIconShared,
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});

export default styles;
