import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/attendance/MemberScheduleAPI";
import { takeLatest } from "redux-saga/effects";

const [TEAM, TEAM_SUCCESS, TEAM_FAILURE] =
  createRequestActionTypes("annual/TEAM"); //타입유형
const [EMP, EMP_SUCCESS, EMP_FAILURE] = createRequestActionTypes("annual/EMP"); //타입유형
const [ATTEND, ATTEND_SUCCESS, ATTEND_FAILURE] =
  createRequestActionTypes("annual/ATTEND"); //타입유형
const TREEVALUE = "annual/VALUE";
const SELECTALLLIST = "annual/SELECTALLLIST";

export const teamAxios = createAction(TEAM); //리덕스의 액션함수
export const empAxios = createAction(EMP); //리덕스의 액션함수
export const attendAxios = createAction(ATTEND); //리덕스의 액션함수

export const treeValue = createAction(TREEVALUE);
export const selectAllList = createAction(SELECTALLLIST);

const teamSaga = createRequestSaga(TEAM, API.SelectTeam);
const empSaga = createRequestSaga(EMP, API.SelectEmp);
const attendSaga = createRequestSaga(ATTEND, API.SelectAttend);

export function* memberScheduleSaga2() {
  yield takeLatest(TEAM, teamSaga);
  yield takeLatest(EMP, empSaga);
  yield takeLatest(ATTEND, attendSaga);
}
const initialState = {
  //초기값을 정의
  team: [],
  emp: [],
  attend: [],
  teamError: null,
  empError: null,
  attendError: null,

  treevalue: [],
  treevalueError: null,

  selectalllist: [],
  selectalllistError: null,
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
    [ATTEND_SUCCESS]: (state, { payload: attend }) => ({
      ...state,
      attendError: null,
      attend,
    }),
    [ATTEND_FAILURE]: (state, { payload: error }) => ({
      ...state,
      attendError: error,
    }),
    [TREEVALUE]: (state, { payload: treevalue }) => ({
      ...state,
      treevalueError: null,
      treevalue,
    }),
    [SELECTALLLIST]: (state, { payload: selectalllist }) => ({
      ...state,
      selectalllistError: null,
      selectalllist,
    }),
  },
  initialState
);

export default memberSchedule;
