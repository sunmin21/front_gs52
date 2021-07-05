import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../../lib/createRequestSaga";
import * as API from "../../../lib/api/schedule/PersonalScheduleAPI";
import { takeLatest } from "redux-saga/effects";

const [PERSON, PERSON_SUCCESS, PERSON_FAILURE] =
  createRequestActionTypes("schedule/PERSON"); //타입유형

const [LEADER, LEADER_SUCCESS, LEADER_FAILURE] =
  createRequestActionTypes("schedule/LEADER"); //타입유형

export const personAxios = createAction(PERSON); //리덕스의 액션함수

export const leaderAxios = createAction(LEADER); //리덕스의 액션함수

const teamSaga = createRequestSaga(PERSON, API.SelectConfPerson);
const leaderSaga = createRequestSaga(LEADER, API.SelectConfLeader);

export function* personScheduleSaga2() {
  yield takeLatest(PERSON, teamSaga);
  yield takeLatest(LEADER, leaderSaga);
}
const initialState = {
  //초기값을 정의
  person: [],
  personError: null,
  leader: [],
  leaderError: null,
};

const personSchedule = handleActions(
  {
    [PERSON_SUCCESS]: (state, { payload: person }) => ({
      ...state,
      personError: null,
      person,
    }),

    [PERSON_FAILURE]: (state, { payload: error }) => ({
      ...state,
      personError: error,
    }),
    [LEADER_SUCCESS]: (state, { payload: leader }) => ({
      ...state,
      leaderError: null,
      leader,
    }),

    [LEADER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      leaderError: error,
    }),
  },
  initialState
);

export default personSchedule;
