import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "../lib/createRequestSaga";
import produce from "immer";

const CHANGE_BOARD = "task/CHANGE_BOARD"; //기능에 대한 이름
// const [USER, TEST_SUCCESS, TEST_FAILURE] =
//   createRequestActionTypes("auth/TEST");

// dispatch할때 필요한 값   액션함수를 만들어줘야해요
export const changeBoard = createAction(
  CHANGE_BOARD,
  ({ form, 사원번호, 이름, 요청사항, 첨부파일 }) => ({
    form,
    key: { 사원번호, 이름, 요청사항, 첨부파일 },
  })
);
const initialState = {
  //초기값을 정의
  board: {
    사원번호: "",
    이름: "",
    요청사항: "",
    첨부파일: "",
  },

  user: {},
};
const task = handleActions(
  {
    [CHANGE_BOARD]: (state, { payload: { form, key } }) => {
      return produce(state, (draft) => {
        draft[form] = key;
      });
    },
  },
  initialState
);

export default task;
