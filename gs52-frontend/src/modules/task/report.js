import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/task/ReportAPI";
import { takeLatest } from "redux-saga/effects";

const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
    createRequestActionTypes("task/REPORT"); //타입유형
const [NEXTREPORT, NEXTREPORT_SUCCESS, NEXTREPORT_FAILURE] =
    createRequestActionTypes("task/NEXTREPORT"); //타입유형
const [OTHERSREPORT, OTHERSREPORT_SUCCESS, OTHERSREPORT_FAILURE] =
    createRequestActionTypes("task/OTHERSREPORT"); //타입유형
const [NEXTOTHERSREPORT, NEXTOTHERSREPORT_SUCCESS, NEXTOTHERSREPORT_FAILURE] =
    createRequestActionTypes("task/NEXTOTHERSREPORT"); //타입유형

export const reportAxios = createAction(REPORT); //리덕스의 액션함수
export const nextreportAxios = createAction(NEXTREPORT); //리덕스의 액션함수
export const othersreportAxios = createAction(OTHERSREPORT);
export const nextothersreportAxios = createAction(NEXTOTHERSREPORT);

const reportSaga = createRequestSaga(REPORT, API.SelectReport);
const nextreportSaga = createRequestSaga(NEXTREPORT, API.SelectReport);
const othersreportSaga = createRequestSaga(OTHERSREPORT, API.SelectOthersReport);
const nextothersreportSaga = createRequestSaga(NEXTOTHERSREPORT, API.SelectOthersReport);

export function* reportSaga2() {
    yield takeLatest(REPORT, reportSaga);
    yield takeLatest(NEXTREPORT, nextreportSaga);
    yield takeLatest(OTHERSREPORT, othersreportSaga);
    yield takeLatest(NEXTOTHERSREPORT, nextothersreportSaga);
}

const initialState = {
    //초기값을 정의
    report: [],
    reportError: null,
    nextreport: [],
    nextreportError: null,
    othersreport: [],
    othersreportError: null,
    nextothersreport: [],
    nextothersreportError: null,
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

        [NEXTREPORT_SUCCESS]: (state, { payload: nextreport }) => ({
        ...state,
        nextreportError: null,
        nextreport,
        }),

        [NEXTREPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        nextreportError: error,
        }),

        [OTHERSREPORT_SUCCESS]: (state, { payload: othersreport }) => ({
        ...state,
        othersreportError: null,
        othersreport,
        }),

        [OTHERSREPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        othersreportError: error,
        }),
        
        [NEXTOTHERSREPORT_SUCCESS]: (state, { payload: nextothersreport }) => ({
        ...state,
        nextothersreportError: null,
        nextothersreport,
        }),

        [NEXTOTHERSREPORT_FAILURE]: (state, { payload: error }) => ({
        ...state,
        nextothersreportError: error,
        }),
    },
    initialState
);

export default report;
