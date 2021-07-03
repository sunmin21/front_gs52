import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/ProjectList";
import { takeLatest } from "redux-saga/effects";

const [PROCEEDING, PROCEEDING_SUCCESS, PROCEEDING_FAILURE] =
  createRequestActionTypes("schedule/PROCEEDING"); //타입유형

export const proceedingAxios = createAction(PROCEEDING); //리덕스의 액션함수

const proceedingSaga = createRequestSaga(PROCEEDING, API.SelectProceeding);

export function* proceedingSaga2() {
    yield takeLatest(PROCEEDING, proceedingSaga);
}

const initialState = {
  //초기값을 정의
  proceeding: [],
  proceedingError: null,
};

// 리듀서 선언부분
const project = handleActions(
  {
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
