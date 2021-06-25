import { createAction, handleActions } from "redux-actions";
import moment from "moment";

const DEC_MONTH = "baseDate/DEC_MONTH";
const INC_MONTH = "baseDate/INC_MONTH";

export const decMonth = createAction(DEC_MONTH);
export const incMonth = createAction(INC_MONTH);

const initialState = {
  date: moment(),
};

export default handleActions(
  {
    [DEC_MONTH]: (state, action) => ({
      ...state,
      baseDate: state.date.add(-1, "months"),
    }),
    [INC_MONTH]: (state, action) => ({
      ...state,
      baseDate: state.date.add(1, "months"),
    }),
  },
  initialState
);
