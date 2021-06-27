import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/attendance/MemberScheduleAPI";
import { takeLatest } from "redux-saga/effects";

const [TEAM, TEAM_SUCCESS, TEAM_FAILURE] =
  createRequestActionTypes("annual/TEAM"); //타입유형
const [EMP, EMP_SUCCESS, EMP_FAILURE] = createRequestActionTypes("annual/EMP"); //타입유형

export const teamAxios = createAction(TEAM); //리덕스의 액션함수
export const empAxios = createAction(EMP); //리덕스의 액션함수

const teamSaga = createRequestSaga(TEAM, API.SelectTeam);
const empSaga = createRequestSaga(EMP, API.SelectEmp);

export function* memberScheduleSaga2() {
  yield takeLatest(TEAM, teamSaga);
  yield takeLatest(EMP, empSaga);
}
const initialState = {
  //초기값을 정의
  team: [],
  emp: [],
  teamError: null,
  empError: null,
};

const memberSchedule = handleActions(
  {
    [TEAM_SUCCESS]: (state, { payload: team }) => ({
      ...state,
      teamError: null,
      team,
    }),

    [TEAM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      teamError: error,
    }),
    [EMP_SUCCESS]: (state, { payload: emp }) => ({
      ...state,
      empError: null,
      emp,
    }),
    [EMP_FAILURE]: (state, { payload: error }) => ({
      ...state,
      empError: error,
    }),
  },
  initialState
);

export default memberSchedule;
