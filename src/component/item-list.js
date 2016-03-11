import React from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StyleSheet, { px } from './styles';
import theme from './theme';

const { string } = React.PropTypes;
const { listOf } = ImmutablePropTypes;
const itemMargin = 2;

export const styles = StyleSheet.create({
  root: {
    transform: 'translateZ(0)',
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

function renderItems(props) {
  const { items } = props;
  return items.map((value, i) =>
    <div className={styles.item} key={`item-${i}`}>
      <div className={styles.itemInner}>
        {value}
      </div>
    </div>
  );
}

export default function ItemList(props) {
  return (
    <div className={styles.root}>
      {renderItems(props)}
    </div>
  );
}

ItemList.propTypes = {
  items: listOf(string),
};

ItemList.defaultProps = {
  items: new List(),
};
