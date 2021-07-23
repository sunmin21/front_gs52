import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/manager/project/ProjectAPI";
import { takeLatest } from "redux-saga/effects";

const [OKAY, OKAY_SUCCESS, OKAY_FAILURE] =
  createRequestActionTypes("manager/OKAY"); //타입유형

const [ALL, ALL_SUCCESS, ALL_FAILURE] = createRequestActionTypes("manager/ALL"); //타입유형

export const okayAxios = createAction(OKAY); //리덕스의 액션함수

export const AllAxios = createAction(ALL); //리덕스의 액션함수

const okaySaga = createRequestSaga(OKAY, API.SelectOkay);

const allSaga = createRequestSaga(ALL, API.SelectAll);

export function* okaySaga2() {
  yield takeLatest(OKAY, okaySaga);
  yield takeLatest(ALL, allSaga);
}

const initialState = {
  //초기값을 정의
  okay: [],
  all: [],
  allError: null,
  okayError: null,
};

// 리듀서 선언부분
const projectManage = handleActions(
  {
    [OKAY_SUCCESS]: (state, { payload: okay }) => ({
      ...state,
      okayError: null,
      okay,
    }),

    [OKAY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      okayError: error,
    }),
    [ALL_SUCCESS]: (state, { payload: all }) => {
      console.log(all);
      return {
        ...state,
        allError: null,
        all,
      };
    },

    [ALL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      allError: error,
    }),
  },
  initialState
);

export default projectManage;
