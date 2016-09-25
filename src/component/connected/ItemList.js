// @flow
import withListAsItems from '../enhancer/withListAsItems';
import ComposedItemList from '../composed/ItemList';

const ConnectedItemList = withListAsItems()(ComposedItemList);

export default ConnectedItemList;
