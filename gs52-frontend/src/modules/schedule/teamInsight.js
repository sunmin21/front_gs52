import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/schedule/TeamInsightAPI";
import { takeLatest } from "redux-saga/effects";

const [ENTRYDATE, ENTRYDATE_SUCCESS, ENTRYDATE_FAILURE] =
  createRequestActionTypes("schedule/ENTRYDATE"); //타입유형
const [PROJECT, PROJECT_SUCCESS, PROJECT_FAILURE] =
  createRequestActionTypes("schedule/PROJECT"); //타입유형
const [TODO, TODO_SUCCESS, TODO_FAILURE] =
  createRequestActionTypes("schedule/TODO"); //타입유형
const [BUSINESS, BUSINESS_SUCCESS, BUSINESS_FAILURE] =
  createRequestActionTypes("schedule/BUSINESS"); //타입유형
const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
  createRequestActionTypes("schedule/REPORT"); //타입유형
const [WORKTIME, WORKTIME_SUCCESS, WORKTIME_FAILURE] =
  createRequestActionTypes("schedule/WORKTIME"); //타입유형

export const entrydateAxios = createAction(ENTRYDATE); //리덕스의 액션함수
export const projectAxios = createAction(PROJECT); //리덕스의 액션함수
export const todoAxios = createAction(TODO); //리덕스의 액션함수
export const businessAxios = createAction(BUSINESS); //리덕스의 액션함수
export const reportAxios = createAction(REPORT); //리덕스의 액션함수
export const worktimeAxios = createAction(WORKTIME); //리덕스의 액션함수

const entrydateSaga = createRequestSaga(ENTRYDATE, API.SelectTeamEntryDate);
const projectSaga = createRequestSaga(PROJECT, API.SelectTeamProject);
const todoSaga = createRequestSaga(TODO, API.SelectTeamTodo);
const businessSaga = createRequestSaga(BUSINESS, API.SelectTeamBusiness);
const reportSaga = createRequestSaga(REPORT, API.SelectTeamReport);
const worktimeSaga = createRequestSaga(WORKTIME, API.SelectTeamWorkTime);

export function* TeamInsightSaga2() {
  yield takeLatest(ENTRYDATE, entrydateSaga);
  yield takeLatest(PROJECT, projectSaga);
  yield takeLatest(TODO, todoSaga);
  yield takeLatest(BUSINESS, businessSaga);
  yield takeLatest(REPORT, reportSaga);
  yield takeLatest(WORKTIME, worktimeSaga);
}
const initialState = {
  //초기값을 정의
  entrydate: [],
  entrydateError: null,

  project: [],
  projectError: null,

  todo: [],
  todoError: null,

  business: [],
  businessError: null,

  report: [],
  reportError: null,

  worktime: [],
  worktimeError: null,
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
    [PROJECT_SUCCESS]: (state, { payload: project }) => ({
      ...state,
      projectError: null,
      project,
    }),

    [PROJECT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectError: error,
    }),
    [TODO_SUCCESS]: (state, { payload: todo }) => ({
      ...state,
      todoError: null,
      todo,
    }),

    [TODO_FAILURE]: (state, { payload: error }) => ({
      ...state,
      todoError: error,
    }),
    [BUSINESS_SUCCESS]: (state, { payload: business }) => ({
      ...state,
      businessError: null,
      business,
    }),

    [BUSINESS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      businessError: error,
    }),
    [REPORT_SUCCESS]: (state, { payload: report }) => ({
      ...state,
      reportError: null,
      report,
    }),

    [REPORT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      reportError: error,
    }),
    [WORKTIME_SUCCESS]: (state, { payload: worktime }) => ({
      ...state,
      worktimeError: null,
      worktime,
    }),

    [WORKTIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      worktimeError: error,
    }),
  },
  initialState
);

export default teamInsight;
