import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import pureRender from 'pure-render-decorator';
import StyleSheet, { px } from './styles';
import theme from './theme';

const { string } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const itemMargin = 2;

export const styles = StyleSheet.create({
  root: {
  },
  item: {
    height: '1em',
    padding: `0 0 ${itemMargin}px 0`,
    display: 'flex',
  },
  itemInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: px(theme.baseBorderRadius),
    backgroundColor: theme.highlightColor,
    color: theme.inverseTextColor,
    fontSize: '1rem',
    fontWeight: 'bold',
  },
});

@pureRender
export default class ItemList extends React.Component {

  static propTypes = {
    items: listOf(string),
  }

  static defaultProps = {
    items: new List(),
  }

  renderItems() {
    const { items } = this.props;
    return items.map((value, i) =>
      <div className={styles.item} key={`item-${i}`}>
        <div className={styles.itemInner}>
          {value}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderItems()}
      </div>
    );
  }
}
