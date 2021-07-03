import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/Project";
import { takeLatest } from "redux-saga/effects";

// const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  // createRequestActionTypes("schedule/PROJECT"); //타입유형
const [PROCEEDING, PROCEEDING_SUCCESS, PROCEEDING_FAILURE] =
  createRequestActionTypes("schedule/PROCEEDING"); //타입유형

// export const projectAxios = createAction(PROJECT, ({ 인덱스 }) => ({
//   인덱스,
// })); //리덕스의 액션함수
export const proceedingAxios = createAction(PROCEEDING); //리덕스의 액션함수

// const projectSelectSaga = createRequestSaga(PROJECT, API.SelectProject);
const proceedingSaga = createRequestSaga(PROCEEDING, API.SelectProceeding);

export function* projectSaga2() {
  // yield takeLatest(PROJECT, projectSelectSaga);
  yield takeLatest(PROCEEDING, proceedingSaga);
}

const initialState = {
  //초기값을 정의
  // project: {},
  // projectError: null,
  proceeding: [],
  proceedingError: null,
};

// 리듀서 선언부분
const project = handleActions(
  {
    // [PROJECT_SUCCESS]: (state, { payload: project }) => ({
    //   ...state,
    //   projectError: null,
    //   project,
    // }),

    // [PROJECT_FAILURE]: (state, { payload: error }) => ({
    //   ...state,
    //   projectError: error,
    // }),

    [PROCEEDING_SUCCESS]: (state, { payload: proceeding }) => ({
      ...state,
      proceedingError: null,
      proceeding,
    }),

    [PROCEEDING_FAILURE]: (state, { payload: error }) => ({
      ...state,
      proceedingError: error,
    }),
  },
  initialState
);

export default project;
