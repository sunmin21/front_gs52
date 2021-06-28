import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/task/ReportAPI";
import { takeLatest } from "redux-saga/effects";

const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
    createRequestActionTypes("task/REPORT"); //타입유형
const [addREPORT, addREPORT_SUCCESS, addREPORT_FAILURE] =
  createRequestActionTypes("task/addREPORT"); //타입유형
const [delREPORT, delREPORT_SUCCESS, delREPORT_FAILURE] =
  createRequestActionTypes("task/delREPORT"); //타입유형

export const reportAxios = createAction(REPORT); //리덕스의 액션함수
export const addreportAxios = createAction(addREPORT); //리덕스의 액션함수
export const delreportAxios = createAction(delREPORT); //리덕스의 액션함수

const reportSaga = createRequestSaga(REPORT, API.SelectReport);
const addreportSaga = createRequestSaga(addREPORT, API.InsertReport);
const delreportSaga = createRequestSaga(delREPORT, API.DeleteReport);

export function* reportSaga2() {
    yield takeLatest(REPORT, reportSaga);
    yield takeLatest(addREPORT, addreportSaga);
    yield takeLatest(delREPORT, delreportSaga);
}
const initialState = {
    //초기값을 정의
    report: [],
    reportError: null,
    addreport: [],
    addreportError: null,
    delreport: [],
    delreportError: null,    
};

// 리듀서 선언부분
const report = handleActions(
    {
        [REPORT_SUCCESS]: (state, { payload: report }) => ({
        ...state,
        reportError: null,
        report,
        }),

        [REPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        reportError: error,
        }),
        //////////////////////////////////////////////////////
        [addREPORT_SUCCESS]: (state, { payload: addreport }) => ({
        ...state,
        addreportError: null,
        addreport,
        }),

        [addREPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        addreportError: error,
        }),
        /////////////////////////////////////////////////////
        [delREPORT_SUCCESS]: (state, { payload: delreport }) => ({
        ...state,
        delreportError: null,
        delreport,
        }),

        [delREPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        delreportError: error,
        }),
    },
    initialState
);

export default report;
