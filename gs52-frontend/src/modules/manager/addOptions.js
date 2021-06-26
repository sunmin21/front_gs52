import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import produce from "immer";
import * as API from "../../lib/api/manager/addOptions/addOptions";
import { takeLatest } from "redux-saga/effects";

const [DEPT, DEPT_SUCCESS, DEPT_FAILURE] =
  createRequestActionTypes("addOptions/DEPT"); //타입유형
const [TEAM, TEAM_SUCCESS, TEAM_FAILURE] =
  createRequestActionTypes("addOptions/TEAM"); //타입유형

const [WORKRULE, WORKRULE_SUCCESS, WORKRULE_FAILURE] = createRequestActionTypes(
  "addOptions/WORKRULE"
); //타입유형

const [WORKTYPE, WORKTYPE_SUCCESS, WORKTYPE_FAILURE] = createRequestActionTypes(
  "addOptions/WORKTYPE"
);

const [CONFROOM, CONFROOM_SUCCESS, CONFROOM_FAILURE] = createRequestActionTypes(
  "addOptions/CONFROOM"
);

export const deptAxios = createAction(DEPT); //리덕스의 액션함수
export const teamAxios = createAction(TEAM); //리덕스의 액션함수
export const workRuleAxios = createAction(WORKRULE); //리덕스의 액션함수

export const workTypeAxios = createAction(WORKTYPE); //리덕스의 액션함수
export const confRoomAxios = createAction(CONFROOM); //리덕스의 액션함수
const todoSaga = createRequestSaga(DEPT, API.SelectDept);

const teamSaga = createRequestSaga(TEAM, API.SelectTeam);

const workRuleSaga = createRequestSaga(WORKRULE, API.SelectWorkRule);

const workTypeSaga = createRequestSaga(WORKTYPE, API.SelectWorkType);

const confRoomSaga = createRequestSaga(CONFROOM, API.SelectConfRoom);
export function* managerSaga() {
  yield takeLatest(DEPT, todoSaga);
  yield takeLatest(TEAM, teamSaga);
  yield takeLatest(WORKRULE, workRuleSaga);
  yield takeLatest(WORKTYPE, workTypeSaga);
  yield takeLatest(CONFROOM, confRoomSaga);
}
const initialState = {
  //초기값을 정의
  dept: [],
  team: [],
  workrule: [],
  worktype: [],
  confroom: [],
  worktypeError: null,
  deptError: null,
  workruleError: null,
  teamError: null,
  confroomError: null,
};
const task = handleActions(
  {
    [DEPT_SUCCESS]: (state, { payload: dept }) => ({
      ...state,
      deptError: null,
      dept,
    }),

    [DEPT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      deptError: error,
    }),
    [TEAM_SUCCESS]: (state, { payload: team }) => ({
      ...state,
      teamError: null,
      team,
    }),

    [TEAM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      teamError: error,
    }),
    [WORKRULE_SUCCESS]: (state, { payload: workrule }) => ({
      ...state,
      workruleError: null,
      workrule,
    }),

    [WORKRULE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      workruleError: error,
    }),
    [WORKTYPE_SUCCESS]: (state, { payload: worktype }) => ({
      ...state,
      worktypeError: null,
      worktype,
    }),

    [WORKTYPE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      worktypeError: error,
    }),
    [CONFROOM_SUCCESS]: (state, { payload: confroom }) => ({
      ...state,
      confroomError: null,
      confroom,
    }),

    [CONFROOM_FAILURE]: (state, { payload: error }) => ({
      ...state,
      confroomError: error,
    }),
  },
  initialState
);

export default task;
