import React from 'react';
import cx from 'classnames';
import pureRender from 'pure-render-decorator';
import Button from '../button';
import styles from './styles';
import { listType } from './types';

const { object, bool } = React.PropTypes;

@pureRender
export default class TestScreen extends React.Component {

  static propTypes = {
    actions: object,
    showBackground: bool,
    list: listType,
  }

  render() {
    const { showBackground, actions } = this.props;

    return (
      <div className={styles.root}>
        <div className={cx(styles.foreground, { [styles.foregroundOpen]: showBackground })}>

          <Button onClick={actions.showBackground}>Background</Button>

        </div>
        <div className={cx(styles.background, { [styles.backgroundShown]: showBackground })}>
          <div className={styles.backgroundControls}>
            <Button type="inverse" onClick={actions.hideBackground}>Back</Button>
          </div>
          <div className={styles.backgroundContent}>
            <p>
              Hello there
            </p>
          </div>
        </div>
      </div>
    );
  }
}
