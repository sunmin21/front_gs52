import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/task/ReportAPI";
import { takeLatest } from "redux-saga/effects";

const [REPORT, REPORT_SUCCESS, REPORT_FAILURE] =
  createRequestActionTypes("task/REPORT"); //타입유형

export const reportAxios = createAction(REPORT); //리덕스의 액션함수

const reportSaga = createRequestSaga(REPORT, API.SelectReport);

export function* reportSaga2() {
    yield takeLatest(REPORT, reportSaga);
}
const initialState = {
    //초기값을 정의
    report: [],
    reportError: null,
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
    },
    initialState
);

export default report;
