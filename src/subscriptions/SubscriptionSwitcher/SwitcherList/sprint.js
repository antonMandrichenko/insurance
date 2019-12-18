import { connect } from 'react-redux';
import SwitcherList from './SwitcherList';
import { getAllSprintSubscriptions, getAllSubscriptions } from 'reducers';
import { fetchAll as fetchSubs } from 'subscriptions/sprint/actions';
import { findAll as findAllSubs } from 'insurance/insuranceContracts/actions';

const mapStateToProps = (state) => ({
  subs: getAllSprintSubscriptions(state),
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
