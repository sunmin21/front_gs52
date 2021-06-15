import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "../lib/createRequestSaga";
import produce from "immer";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const [TEST, TEST_SUCCESS, TEST_FAILURE] =
  createRequestActionTypes("auth/TEST");

// dispatch할때 필요한 값
export const change = createAction(TEST);
const initialState = {
  board: "바꾸기전",
};
const test = handleActions(
  {
    [TEST]: (state) => ({
      ...state,
      board: "바뀐값",
    }),
  },
  initialState
);

export default test;
