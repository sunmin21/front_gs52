import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/Project";
import { takeLatest } from "redux-saga/effects";

const PROJECTNO = "schedule/PROJECTNO";

const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  createRequestActionTypes("schedule/PROJECT"); //타입유형

export const projectAxios = createAction(PROJECT, (index) => {
  console.log(index);
  return {
    index,
  };
}); //리덕스의 액션함수

export const projectNoChange = createAction(PROJECTNO, ({ index }) => {
  return {
    index,
  };
});
const projectSelectSaga = createRequestSaga(PROJECT, API.SelectOneProject);

export function* projectSaga2() {
  yield takeLatest(PROJECT, projectSelectSaga);
}

const initialState = {
  //초기값을 정의
  projectNo: 0,
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
    [PROJECTNO]: (state, { payload: { index } }) => {
      return {
        ...state,
        projectNo: index,
      };
    },
  },
  initialState
);

export default project;
