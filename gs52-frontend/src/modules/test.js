import { createAction, handleActions } from "redux-actions";
import { createRequestActionTypes } from "../lib/createRequestSaga";

const [TEST] = createRequestActionTypes("auth/TEST");

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
