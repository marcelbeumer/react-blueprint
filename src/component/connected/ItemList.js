// @flow
import { compose } from 'redux';
import withListAsItems from '../enhancer/withListAsItems';
import ComposedItemList from '../composed/ItemList';

const ConnectedItemList = compose(
  withListAsItems(),
)(ComposedItemList);

export default ConnectedItemList;
