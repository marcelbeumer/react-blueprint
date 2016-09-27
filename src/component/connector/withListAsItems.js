// @flow
import { connect } from 'react-redux';
import range from 'lodash/range';
import memoize from 'lodash/memoize';
import { List } from 'immutable';

const getList = memoize((length) => new List(range(length).map(num => String(num))));

const mapStateToProps = (state) => ({
  items: getList(state.list.length),
});

export default () => connect(mapStateToProps);
