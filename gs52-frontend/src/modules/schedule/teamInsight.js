import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/schedule/TeamInsightAPI";
import { takeLatest } from "redux-saga/effects";

const [ENTRYDATE, ENTRYDATE_SUCCESS, ENTRYDATE_FAILURE] =
  createRequestActionTypes("schedule/ENTRYDATE"); //타입유형

export const entrydateAxios = createAction(ENTRYDATE); //리덕스의 액션함수

const entrydateSaga = createRequestSaga(ENTRYDATE, API.SelectTeamEntryDate);

export function* TeamInsightSaga2() {
  yield takeLatest(ENTRYDATE, entrydateSaga);
}
const initialState = {
  //초기값을 정의
  entrydate: [],
  entrydateError: null,
};

const teamInsight = handleActions(
  {
    [ENTRYDATE_SUCCESS]: (state, { payload: entrydate }) => ({
      ...state,
      entrydateError: null,
      entrydate,
    }),

    [ENTRYDATE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      entrydateError: error,
    }),
  },
  initialState
);

export default teamInsight;
