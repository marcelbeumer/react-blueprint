import React from 'react';
import pureRender from 'pure-render-decorator';
import ScreenContainer from '../container';
import ScreenForeground from '../foreground';
import ScreenBackground from '../background';
import ScreenBackgroundContent from '../background/content';
import ScreenBackgroundControls from '../background/controls';
import GithubIcon from '../../github-icon';
import HomeScreenWidgets from './widgets';
import Button from '../../button';
import styles from './styles';
import { listType } from '../../types';

const { object, bool } = React.PropTypes;

@pureRender
export default class HomeScreen extends React.Component {

  static propTypes = {
    actions: object,
    showBackground: bool,
    list: listType,
  }

  render() {
    const { list, actions } = this.props;

    return (
      <ScreenContainer>
        <ScreenForeground {...this.props}>
          <div className={styles.widgets}>
            <HomeScreenWidgets list={list} actions={actions} />
          </div>

          <Button onClick={actions.showBackground}>Explain</Button>

          <div className={styles.websites}>
            <a className={styles.githubIcon}
              href="https://github.com/marcelbeumer/react-blueprint"
              alt="Github"
            >
              <GithubIcon />
            </a>
          </div>

          <div className={styles.footer}>
            <a className={styles.link} href="https://github.com/marcelbeumer/react-blueprint">
              marcelbeumer/react-blueprint
            </a>
          </div>
        </ScreenForeground>
        <ScreenBackground {...this.props}>
          <ScreenBackgroundControls>
            <Button type="inverse" onClick={actions.hideBackground}>Back</Button>
          </ScreenBackgroundControls>
          <ScreenBackgroundContent>
            <p>
              <strong>Hello.</strong> Just drag and scroll around with the widgets.
              It's not supposed to make sense: it's purely a tech demo wiring widgets together.
            </p>

            <p>
              What you see is backed by a frontend
              architecture based on React and Flux/Redux that scales up well
              for big and complex applications. The page is pre-rendered by the server.
            </p>

            <p>
              Check <a href="https://github.com/marcelbeumer/react-blueprint">Github</a> for
              more details.
            </p>
          </ScreenBackgroundContent>
        </ScreenBackground>
      </ScreenContainer>
    );
  }
}
