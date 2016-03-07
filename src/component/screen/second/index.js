import React from 'react';
import pureRender from 'pure-render-decorator';
import ScreenContainer from '../container';
import ScreenForeground from '../foreground';
import ScreenBackground from '../background';
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

@pureRender
export default class SecondScreen extends React.Component {

  render() {
    return (
      <ScreenContainer>
        <ScreenForeground {...this.props}>
          <div className={styles.content}>
            Page 2
          </div>
          <div className={styles.note}>
            more coming soon...
          </div>
        </ScreenForeground>
        <ScreenBackground />
      </ScreenContainer>
    );
  }
}
