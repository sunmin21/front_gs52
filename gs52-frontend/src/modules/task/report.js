import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/task/ReportAPI";
import { takeLatest } from "redux-saga/effects";

const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
    createRequestActionTypes("task/REPORT"); //타입유형
const [NEXTREPORT, NEXTREPORT_SUCCESS, NEXTREPORT_FAILURE] =
    createRequestActionTypes("task/NEXTREPORT"); //타입유형
// userlist
// const[EMPLIST, EMPLIST_SUCCESS, EMPLIST_FAILURE] =
//     createRequestActionTypes("task/EMPLIST");

export const reportAxios = createAction(REPORT); //리덕스의 액션함수
export const nextreportAxios = createAction(NEXTREPORT); //리덕스의 액션함수
// export const emplistAxios = createAction(EMPLIST);

const reportSaga = createRequestSaga(REPORT, API.SelectReport);
const nextreportSaga = createRequestSaga(NEXTREPORT, API.SelectReport);
// const emplistSaga = createRequestSaga(EMPLIST, API.EmpList);

export function* reportSaga2() {
    yield takeLatest(REPORT, reportSaga);
    yield takeLatest(NEXTREPORT, nextreportSaga);
    // yield takeLatest(EMPLIST, emplistSaga);
}

const initialState = {
    //초기값을 정의
    report: [],
    reportError: null,
    nextreport: [],
    nextreportError: null,
    // emplist: [],
    // emplistError: null,
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

        // [EMPLIST_SUCCESS]: (state, { payload: emplist }) => ({
        // ...state,
        // emplistError: null,
        // emplist,
        // }),

        // [EMPLIST_FAILURE]: (state, { payload: error }) => ({
        // ...state,
        // emplistError: error,
        // }),
    },
    initialState
);

export default report;
