import StyleSheet from '../styles';
import theme from '../theme';

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
  root: {
    fontFamily: theme.fontFamily,
    fontWeight: theme.fontWeight,
    fontSize: '12px',
    lineHeight: '16px',
    [theme.media.fromTablet]: {
      fontSize: '14px',
      lineHeight: '18px',
    },
    [theme.media.fromDesktop]: {
      fontSize: '16px',
      lineHeight: '20px',
    },
  },
  foreground: {
    margin: '0 auto',
    minWidth: '320px',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: theme.backgroundColor,
    transform: 'translateZ(0)',
    color: theme.textColor,
    textAlign: 'center',
    paddingTop: '60px',
    transition: 'transform 0.3s ease-in',
    [theme.media.fromTablet]: {
      paddingTop: '100px',
    },
    [theme.media.fromDesktop]: {
      paddingTop: '160px',
    },
  },
  foregroundOpen: {
    position: 'absolute',
    width: '100%',
    transform: 'translateZ(0) scale(0.8, 0.8) translate(0, -110%)',
  },
  background: {
    zIndex: -1,
    display: 'none',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'auto',
    padding: '90px 30px',
    textAlign: 'center',
    color: theme.inverseTextColor,
  },
  backgroundContent: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '580px',
  },
  backgroundShown: {
    display: 'block',
  },
  backgroundControls: {
    position: 'fixed',
    top: '50px',
    left: 0,
    width: '100%',
    textAlign: 'center',
  },
  widgets: {
    margin: '0 auto',
    padding: '35px 0 20px',
    width: '170px',
    [theme.media.fromTablet]: {
      padding: '45px 0 20px',
      width: '270px',
    },
    [theme.media.fromDesktop]: {
      padding: '65px 0 20px',
      width: '354px',
    },
  },
  websites: {
    padding: '20px 0',
    marginTop: '50px',
    [theme.media.fromDesktop]: {
      marginTop: '40px',
    },
  },
  githubIcon: websiteIconShared,
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
    padding: '0 10px',
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
