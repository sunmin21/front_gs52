import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/attendance/PersonInsightAPI";
import { takeLatest } from "redux-saga/effects";

const [ENTRYDATE, ENTRYDATE_SUCCESS, ENTRYDATE_FAILURE] =
  createRequestActionTypes("annual/ENTRYDATE"); //타입유형
const [PROJECTCOUNT, PROJECTCOUNT_SUCCESS, PROJECTCOUNT_FAILURE] =
  createRequestActionTypes("annual/PROJECTCOUNT"); //타입유형
const [TODOCOUNT, TODOCOUNT_SUCCESS, TODOCOUNT_FAILURE] =
  createRequestActionTypes("annual/TODOCOUNT"); //타입유형
const [BUSINESS, BUSINESS_SUCCESS, BUSINESS_FAILURE] =
  createRequestActionTypes("annual/BUSINESS"); //타입유형
const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
  createRequestActionTypes("annual/REPORT"); //타입유형
const [TIME, TIME_SUCCESS, TIME_FAILURE] =
  createRequestActionTypes("annual/TIME"); //타입유형
const [INSIGHT, INSIGHT_SUCCESS, INSIGHT_FAILURE] =
  createRequestActionTypes("annual/INSIGHT"); //타입유형

export const personentrydateAxios = createAction(ENTRYDATE); //리덕스의 액션함수
export const projectcountAxios = createAction(PROJECTCOUNT); //리덕스의 액션함수
export const todocountAxios = createAction(TODOCOUNT); //리덕스의 액션함수
export const businesscountAxios = createAction(BUSINESS); //리덕스의 액션함수
export const reportcountAxios = createAction(REPORT); //리덕스의 액션함수
export const personworktimeAxios = createAction(TIME); //리덕스의 액션함수
export const personinsightAxios = createAction(INSIGHT); //리덕스의 액션함수

const entrydateSaga = createRequestSaga(ENTRYDATE, API.SelectEmpEntryDate);
const projectcountSaga = createRequestSaga(
  PROJECTCOUNT,
  API.SelectProjectCount
);
const todocountSaga = createRequestSaga(TODOCOUNT, API.SelectTodoCount);

const businesscountSaga = createRequestSaga(BUSINESS, API.SelectBusinessCount);

const reportcountSaga = createRequestSaga(REPORT, API.SelectReportCount);

const worktimeSaga = createRequestSaga(TIME, API.SelectWorkTime);

const personinsightSaga = createRequestSaga(INSIGHT, API.SelectPersonInsight);

export function* PersonInsightSaga2() {
  yield takeLatest(ENTRYDATE, entrydateSaga);
  yield takeLatest(PROJECTCOUNT, projectcountSaga);
  yield takeLatest(TODOCOUNT, todocountSaga);
  yield takeLatest(BUSINESS, businesscountSaga);
  yield takeLatest(REPORT, reportcountSaga);
  yield takeLatest(TIME, worktimeSaga);
  yield takeLatest(INSIGHT, personinsightSaga);
}
const initialState = {
  //초기값을 정의
  entrydate: [],
  entrydateError: null,

  projectcount: [],
  projectcountError: null,

  todocount: [],
  todocountError: null,

  businesscount: [],
  businesscountError: null,

  reportcount: [],
  reportcountError: null,

  worktime: [],
  worktimeError: null,

  personinsight: [],
  personinsightError: null,
};

const personInsight = handleActions(
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
    [PROJECTCOUNT_SUCCESS]: (state, { payload: projectcount }) => ({
      ...state,
      projectcountError: null,
      projectcount,
    }),

    [PROJECTCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      projectcountError: error,
    }),

    [TODOCOUNT_SUCCESS]: (state, { payload: todocount }) => ({
      ...state,
      todocountError: null,
      todocount,
    }),

    [TODOCOUNT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      todocountError: error,
    }),
    [BUSINESS_SUCCESS]: (state, { payload: businesscount }) => ({
      ...state,
      businesscountError: null,
      businesscount,
    }),

    [BUSINESS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      businesscountError: error,
    }),

    [REPORT_SUCCESS]: (state, { payload: reportcount }) => ({
      ...state,
      reportcountError: null,
      reportcount,
    }),

    [REPORT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      reportcountError: error,
    }),

    [TIME_SUCCESS]: (state, { payload: worktime }) => ({
      ...state,
      worktimeError: null,
      worktime,
    }),

    [TIME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      worktimeError: error,
    }),
    [INSIGHT_SUCCESS]: (state, { payload: personinsight }) => ({
      ...state,
      personinsightError: null,
      personinsight,
    }),

    [INSIGHT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      personinsightError: error,
    }),
  },
  initialState
);

export default personInsight;
