import { call, put } from "redux-saga/effects";
import { finishLoading, startLoading } from "../modules/loading/loading";

export default function createRequestMultiSaga(type, request) {
  return function* (action) {
    // console.log(type);

    let SUCCESS = `${type[0]}_SUCCESS`;
    let response = yield call(request[0], action.payload);
    yield put({
      type: SUCCESS,
      payload: response.data,
    });
    SUCCESS = `${type[1]}_SUCCESS`;
    response = yield call(request[1], action.payload);
    yield put({
      type: SUCCESS,
      payload: response.data,
    });
    SUCCESS = `${type[2]}_SUCCESS`;
    response = yield call(request[2], action.payload);
    yield put({
      type: SUCCESS,
      payload: response.data,
    });
    SUCCESS = `${type[3]}_SUCCESS`;
    response = yield call(request[3], action.payload);
    yield put({
      type: SUCCESS,
      payload: response.data,
    });
    SUCCESS = `${type[4]}_SUCCESS`;
    response = yield call(request[4], action.payload);
    yield put({
      type: SUCCESS,
      payload: response.data,
    });
  };
}
