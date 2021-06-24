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

export const deptAxios = createAction(DEPT); //리덕스의 액션함수
export const teamAxios = createAction(TEAM); //리덕스의 액션함수

const todoSaga = createRequestSaga(DEPT, API.SelectDept);

const teamSaga = createRequestSaga(TEAM, API.SelectTeam);

export function* managerSaga() {
  yield takeLatest(DEPT, todoSaga);
  yield takeLatest(DEPT, teamSaga);
}
const initialState = {
  //초기값을 정의
  dept: [],
  team: [],
  deptError: null,
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
  },
  initialState
);

export default task;
