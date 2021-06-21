import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "../lib/createRequestSaga";
import produce from "immer";

const CHANGE_BOARD = "task/CHANGE_BOARD";

const BOARD_INIT = "task/BOARD_INIT";
// const [USER, TEST_SUCCESS, TEST_FAILURE] =
//   createRequestActionTypes("auth/TEST");

// dispatch할때 필요한 값   액션함수를 만들어줘야해요

export const changeBoard = createAction(CHANGE_BOARD, ({ form, 요청사항 }) => ({
  form,
  요청사항,
}));

export const boardInit = createAction(BOARD_INIT);
const initialState = {
  //초기값을 정의
  board: "ss",

  user: {},
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
  },
  initialState
);

export default task;
