// @flow
import React from 'react';
import Screen from '..';
import GithubIcon from '../../github-icon';
import HomeScreenWidgets from './widgets';
import Button from '../../button';
import pureRender from '../../pure-render';
import styles from './styles';
import type { listType } from '../../types';

export default class HomeScreen extends React.Component {
  props: {
    actions: Object,
    list: listType,
  };

  render() {
    const { list, actions } = this.props;

    return (
      <Screen {...this.props}>
        <div className={styles.widgets}>
          <HomeScreenWidgets list={list} actions={actions} />
        </div>

        <Button>Explain</Button>

        <div className={styles.websites}>
          <a
            className={styles.githubIcon}
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
      </Screen>
    );
  }
}

pureRender(HomeScreen);
