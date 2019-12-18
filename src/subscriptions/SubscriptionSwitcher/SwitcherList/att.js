import { connect } from 'react-redux';
import SwitcherList from './SwitcherList';
import { getAllAttSubscriptions, getAllSubscriptions } from 'reducers';
import { fetchAll as fetchSubs } from 'subscriptions/att/actions';
import { findAll as findAllSubs } from 'insurance/insuranceContracts/actions';

const mapStateToProps = (state) => ({
  subs: getAllAttSubscriptions(state),
  allSubs: getAllSubscriptions(state)
});

const mapDispatchToProps = {
  fetchSubs,
  findAllSubs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwitcherList);

