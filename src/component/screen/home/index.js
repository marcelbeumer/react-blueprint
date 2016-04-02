import React from 'react';
import ScreenContainer from '../container';
import ScreenForeground from '../foreground';
import ScreenBackground from '../background';
import ScreenBackgroundContent from '../background/content';
import ScreenBackgroundControls from '../background/controls';
import GithubIcon from '../../github-icon';
import HomeScreenWidgets from './widgets';
import Button from '../../button';
import pureRender from '../../pure-render';
import styles from './styles';
import { listType } from '../../types';

const { object, bool } = React.PropTypes;

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
              <strong>Hello.</strong> Just drag, scroll and click around with the widgets.
              It's not supposed to make much sense: it's just a tech demo wiring
              UI components together backed by a React/Redux based frontend architecture.
              Check <a href="https://github.com/marcelbeumer/react-blueprint">Github</a> for
              more details.
            </p>

            <p>
              This page demonstrates multiple components rendering the same Redux
              state.  Component events trigger Redux actions updating application
              state, triggering full re-renders optimized by using immutable data
              structures and shallow state/props comparision. This allows Redux
              to completely control constraints and other business logic.
            </p>

            <p>
              Scrolling is an exception though. Because controlling scroll offset
              with props and state will kill smooth scrolling, the DOM element
              will just scroll and call Redux actions based on the already-changed
              scroll offset.  Redux then updates it's application state as if the
              scroll still had to happen, and the component controlling the list
              will just re-render with the scroll offset it already has. Forcing
              scroll offset constraints will work but may result in visual glitches.
              Only software scrolling solutions like zynga/scroller give more
              control.
            </p>

            <p>
              Stateful browser features such as the video or audio element
              have similar issues; playback will not be smooth when setting
              frame/time offsets using props or state only — the browser needs to
              be in control.
            </p>

            <p>
              Navigation items will trigger Redux actions telling the router to change
              URL. The router will call a Redux action setting the application state "screen"
              property, causing animated rendering of the current and upcoming screen.
              By using History API and server pre-rendering reloading the page will show
              the same screen again.
            </p>
          </ScreenBackgroundContent>
        </ScreenBackground>
      </ScreenContainer>
    );
  }
}

pureRender(HomeScreen);
