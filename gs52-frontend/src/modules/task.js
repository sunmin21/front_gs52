import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";
import produce from "immer";
import * as taskAPI from "../lib/api/task/BusinessProgress";
import { takeLatest } from "redux-saga/effects";
const CHANGE_BOARD = "task/CHANGE_BOARD";

const BOARD_INIT = "task/BOARD_INIT";
// const [USER, TEST_SUCCESS, TEST_FAILURE] =
//   createRequestActionTypes("auth/TEST");

// dispatch할때 필요한 값   액션함수를 만들어줘야해요

export const changeBoard = createAction(CHANGE_BOARD, ({ form, 요청사항 }) => ({
  form,
  요청사항,
}));

const [TODO, TODO_SUCCESS, TODO_FAILURE] =
  createRequestActionTypes("task/TODO"); //타입유형
const [SEND, SEND_SUCCESS, SEND_FAILURE] =
  createRequestActionTypes("task/SEND");
const [SUCCESS, SUCCESS_SUCCESS, SUCCESS_FAILURE] =
  createRequestActionTypes("task/SUCCESS");

export const todoAxios = createAction(TODO, (user) => ({
  todo_RE_EMP_ID: user,
})); //리덕스의 액션함수

export const sendAxios = createAction(SEND, (user) => ({
  todo_EMP_ID_SEND: user,
}));

export const succssAxios = createAction(SUCCESS, (user) => ({
  todo_RE_EMP_ID: user,
}));

const todoSaga = createRequestSaga(TODO, taskAPI.todo);

const sendSaga = createRequestSaga(SEND, taskAPI.send);
const successSaga = createRequestSaga(SUCCESS, taskAPI.success);
export const boardInit = createAction(BOARD_INIT);
export function* taskSaga() {
  yield takeLatest(TODO, todoSaga);
  yield takeLatest(SEND, sendSaga);
  yield takeLatest(SUCCESS, successSaga);
}
const initialState = {
  //초기값을 정의
  board: "",
  todo: [],
  send: [],
  success: [],
  user: {},
  todoError: null,
  sendError: null,
  successError: null,
};
const task = handleActions(
  {
    [CHANGE_BOARD]: (state, { payload: { form, 요청사항 } }) => {
      return produce(state, (draft) => {
        draft[form] = 요청사항;
      });
    },
    [BOARD_INIT]: (state) => {
      return produce(state, (draft) => {
        draft["board"] = "";
      });
    },
    [TODO_SUCCESS]: (state, { payload: todo }) => ({
      ...state,
      todoError: null,
      todo,
    }),

    [TODO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      todoError: error,
    }),
    [SEND_SUCCESS]: (state, { payload: send }) => ({
      ...state,
      sendError: null,
      send,
    }),

    [SEND_FAILURE]: (state, { payload: error }) => ({
      ...state,
      sendError: error,
    }),
    [SUCCESS_SUCCESS]: (state, { payload: success }) => ({
      ...state,
      successError: null,
      success,
    }),

    [SUCCESS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      successError: error,
    }),
  },
  initialState
);

export default task;
