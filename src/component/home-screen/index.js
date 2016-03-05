import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import GithubIcon from '../github-icon';
import HomeScreenWidgets from './widgets';
import Button from '../button';
import styles from './styles';
import { listType } from './types';

const { object, bool } = React.PropTypes;

@pureRender
export default class HomeScreen extends React.Component {

  static propTypes = {
    actions: object,
    showBackground: bool,
    list: listType,
  }

  render() {
    const { showBackground, list, actions } = this.props;

    return (
      <div className={styles.root}>
        <div className={cx(styles.foreground, { [styles.foregroundOpen]: showBackground })}>
          <div className={styles.widgets}>
            <HomeScreenWidgets list={list} actions={actions} />
          </div>

          <Button onClick={actions.showBackground}>Explain</Button>

          <div className={styles.websites}>
            <a className={styles.githubIcon}
              href="https://github.com/marcelbeumer/react-blueprint"
              alt="Github">
              <GithubIcon />
            </a>
          </div>

          <div className={styles.footer}>
            <a className={styles.link} href="https://github.com/marcelbeumer/react-blueprint">
              marcelbeumer/react-blueprint
            </a>
          </div>
        </div>
        <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
          <div className={styles.backgroundControls}>
            <Button type="inverse" onClick={actions.hideBackground}>Back</Button>
          </div>
          <div className={styles.backgroundContent}>
            <p>
              <strong>Hello.</strong> Just drag and scroll around with the widgets.
              It's not supposed to make sense: it's purely a tech demo wiring widgets together.
            </p>

            <p>
              What you see is backed by an efficient frontend
              architecture based on React and Flux/Redux that has
              no problem scaling up for very big and complex
              applications. The page is pre-rendered by the server.
            </p>

            <p>
              Widgets use relative (em/vw/vh) units while rendering and pixel values in
              the stylesheet so it's possible to use media queries <strong>and</strong> do
              full server pre-rendering.
              Widget event handlers convert relative values to pixel values.
              Other tricks include pixel perfect scrollbar hiding on both the client and server,
              dragging using react-draggable and JS-based stylesheet generation using stilr.
            </p>

            <p>
              Check the
              the <a href="https://github.com/marcelbeumer/react-blueprint">
                source on Github
              </a>.
            </p>

          </div>
        </div>
      </div>
    );
  }
}
