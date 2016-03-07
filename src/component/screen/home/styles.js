import StyleSheet from '../../styles';
import theme from '../../theme';

const websiteIconShared = {
  display: 'inline-block',
  position: 'relative',
  width: '35px',
  margin: '0 10px',
  [theme.media.fromDesktop]: {
    width: '48px',
    margin: '0 5px',
  },
};

const styles = StyleSheet.create({
  widgets: {
    margin: '0 auto',
    padding: '35px 20px 20px 20px',
    [theme.media.biggerPhones]: {
      maxWidth: '354px',
    },
    [theme.media.fromTablet]: {
      padding: '65px 20px 20px 20px',
    },
  },
  websites: {
    padding: '20px 0',
    marginTop: '40px',
    [theme.media.biggerPhones]: {
      marginTop: '35px',
    },
    [theme.media.fromDesktop]: {
      marginTop: '40px',
    },
  },
  githubIcon: websiteIconShared,
  link: {
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  controls: {
    display: 'flex',
    padding: '120px 10% 80px 10%',
  },
  control: {
    flex: '1',
    margin: '0 25px',
  },
  controlsSpacer: {
    height: '25px',
  },
  footer: {
    padding: '0 10px 10px 0',
  },
  mailto: {
    display: 'block',
    textAlign: 'center',
    color: theme.textColor,
    textDecoration: 'none',
    [':hover']: {
      textDecoration: 'underline',
    },
  },
});

export default styles;
