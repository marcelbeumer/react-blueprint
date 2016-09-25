// @flow
import withListAsItems from '../connector/withListAsItems';
import ComposedItemList from '../composed/ItemList';

const ConnectedItemList = withListAsItems()(ComposedItemList);

export default ConnectedItemList;
