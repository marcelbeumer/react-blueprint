import React from 'react';
import pureRender from '../../pure-render';
import ScreenContainer from '../container';
import ScreenForeground from '../foreground';
import ScreenBackground from '../background';
import ScreenBackgroundContent from '../background/content';
import ScreenBackgroundControls from '../background/controls';
import StyleSheet from '../../styles';

const styles = StyleSheet.create({
  content: {
    fontSize: '5em',
    fontWeight: 'bold',
    lineHeight: '1.1em',
  },
  note: {
    margin: '1em 0',
    fontStyle: 'italic',
  },
});

export default class ThirdScreen extends React.Component {
  render() {
    return (
      <ScreenContainer>
        <ScreenForeground {...this.props}>
          <div className={styles.content}>
            Page 3
          </div>
          <div className={styles.note}>
            more coming soon...
          </div>
        </ScreenForeground>
        <ScreenBackground {...this.props}>
          <ScreenBackgroundControls />
          <ScreenBackgroundContent>
            <p>More coming soon...</p>
          </ScreenBackgroundContent>
        </ScreenBackground>
      </ScreenContainer>
    );
  }
}

pureRender(ThirdScreen);
