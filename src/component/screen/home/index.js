// @flow
import React from 'react';
import Screen from '..';
import GithubIcon from '../../github-icon';
import HomeScreenWidgets from './widgets';
import pureRender from '../../pure-render';
import styles from './styles';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <Screen>
        <div className={styles.widgets}>
          <div className={styles.p}>
            <HomeScreenWidgets {...this.props} />
          </div>
        </div>

        <div className={styles.sites}>
          <a
            className={styles.githubIcon}
            href="https://github.com/marcelbeumer/react-blueprint"
            alt="Github"
          >
            <GithubIcon />
          </a>
        </div>

        <a className={styles.link} href="https://github.com/marcelbeumer/react-blueprint">
          marcelbeumer/react-blueprint
        </a>
      </Screen>
    );
  }
}

pureRender(HomeScreen);
