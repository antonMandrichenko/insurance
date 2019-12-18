import { put, call, takeLatest, takeEvery, all } from 'redux-saga/effects';
import * as types from './types';
import * as api from './api';
import * as actions from './actions';
import { setInsuranceContract as setSprintContract } from 'subscriptions/sprint/actions';
import { setInsuranceContract as setAttContract } from 'subscriptions/att/actions';

import { findGenerator, getAllGenerator, updateGenerator } from 'helpers/resourceSagas';
import * as actionsResoursersSaga from 'helpers/resourceSagas/actions';

export const find = findGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.find
});

export const fetchFiltered = getAllGenerator({
  resourceType: 'insuranceContracts',
  endpoint: api.fetchFiltered,
  endpointArgs: (payload) => [ payload.params ],
});

// export const findAll = findGenerator({
//   resourceType: 'insuranceContracts',
//   endpoint: api.findAll,
// });

export function* findAll(action) {
  const { payload } = action;
  const resourceType = 'insuranceContracts';
  // const page = payload.page || 1;
  const endpoint = api.findAll;
  // const actionProps = {
  //   mergeListIds: page !== 1,
  //   list: 'filtered',
  // }
  const transformResponse = (resp) => resp.data.results;

  try {
    yield put(actionsResoursersSaga.getAllPending(resourceType));
    const resp = yield call(endpoint);
    yield put(actionsResoursersSaga.getAllSucceeded(resourceType, resp, transformResponse));
    // if (resp.data.next) {
    //   const newAction = {
    //     ...action,
    //     payload: {
    //       ...action.payload,
    //       page: page + 1
    //     } 
    //   };
      // yield put(action);
    // }
    console.log(resp)
  }
  catch (err) {
    console.log('err', err)
    // yield put(actions.getAllFailed(resourceType, err, actionProps));
  }
}

export function* watchFind() {
  yield takeEvery(types.FIND, find);
}

export function* watchFetchFiltered() {
  yield takeLatest(types.FETCH_FILTERED, fetchFiltered);
}

export function* watchFindAll() {
  console.log("saga")
  // yield put(actions.findAll())
  yield takeLatest(types.FIND_ALL, findAll);
}

export function* watchInsuranceContracts() {
  yield all([
    call(watchFind),
    call(watchFetchFiltered),
    call(watchFindAll),
  ]);
}
