import StyleSheet from './styles';
import theme from './theme';

const styles = StyleSheet.create({
  root: {
    margin: '0 auto',
    maxWidth: '1600px',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  thinHeaderBar: {
    backgroundColor: theme.backgroundColor,
  },
  hero: {
    [theme.media.fromDesktop]: {
      display: 'flex',
      flex: 1,
    },
  },
  title: {
    [theme.media.fromDesktop]: {
      textAlign: 'center',
      flex: '1',
      fontSize: '2rem',
    },
  },
  primaryControls: {
    flex: '0 1 30%',
  },
  secondaryControls: {
    flex: '0 1 30%',
  },
});

export default styles;
