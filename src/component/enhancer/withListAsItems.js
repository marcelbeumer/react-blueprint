// @flow
import { connect } from 'react-redux';
import range from 'lodash/range';
import { List } from 'immutable';

const mapStateToProps = ({ list }) => ({
  items: new List(range(list.length).map(num => String(num))),
});

export default () => connect(mapStateToProps);
