import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import produce from "immer";
import * as API from "../../lib/api/manager/addOptions/addOptions";
import { takeLatest } from "redux-saga/effects";

const [DEPT, DEPT_SUCCESS, DEPT_FAILURE] =
  createRequestActionTypes("addOptions/DEPT"); //타입유형
export const deptAxios = createAction(DEPT); //리덕스의 액션함수

const todoSaga = createRequestSaga(DEPT, API.SelectDept);
// const [SEND, SEND_SUCCESS, SEND_FAILURE] =
//   createRequestActionTypes("task/SEND");
// const [SUCCESS, SUCCESS_SUCCESS, SUCCESS_FAILURE] =
//   createRequestActionTypes("task/SUCCESS");

// export const sendAxios = createAction(SEND, (user) => ({
//   todo_EMP_ID_SEND: user,
// }));

// export const succssAxios = createAction(SUCCESS, (user) => ({
//   todo_RE_EMP_ID: user,
// }));

// const sendSaga = createRequestSaga(SEND, taskAPI.send);
// const successSaga = createRequestSaga(SUCCESS, taskAPI.success);

export function* managerSaga() {
  yield takeLatest(DEPT, todoSaga);
  //   yield takeLatest(SEND, sendSaga);
  //   yield takeLatest(SUCCESS, successSaga);
}
const initialState = {
  //초기값을 정의
  dept: [],
  deptError: null,
};
const task = handleActions(
  {
    [DEPT_SUCCESS]: (state, { payload: dept }) => ({
      ...state,
      deptError: null,
      dept,
    }),

    [DEPT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deptError: error,
    }),
  },
  initialState
);

export default task;
