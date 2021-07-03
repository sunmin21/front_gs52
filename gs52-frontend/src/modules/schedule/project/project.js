import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/task/ReportAPI";
import { takeLatest } from "redux-saga/effects";

const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  createRequestActionTypes("schedule/PROJECT"); //타입유형

export const projectAxios = createAction(PROJECT, ({ 인덱스 }) => ({
  인덱스,
})); //리덕스의 액션함수

const projectSelectSaga = createRequestSaga(PROJECT, API.SelectReport);

export function* projectSaga2() {
  yield takeLatest(PROJECT, projectSelectSaga);
}

const initialState = {
  //초기값을 정의
  project: {},
  projectError: null,
};

// 리듀서 선언부분
const project = handleActions(
  {
    [PROJECT_SUCCESS]: (state, { payload: project }) => ({
      ...state,
      projectError: null,
      project,
    }),

    [PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectError: error,
    }),
  },
  initialState
);

export default project;
