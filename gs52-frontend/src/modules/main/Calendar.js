// 리덕스
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../../lib/createRequestSaga";
import * as API from "../../lib/api/main/Calendar";
import { takeLatest } from "redux-saga/effects";

const [CALENDAR, CALENDAR_SUCCESS, CALENDAR_FAILURE] =
    createRequestActionTypes("main/CALENDAR"); //타입유형
const [CALENDAR2, CALENDAR2_SUCCESS, CALENDAR2_FAILURE] =
    createRequestActionTypes("main/CALENDAR2"); //타입유형
const [CALENDAR3, CALENDAR3_SUCCESS, CALENDAR3_FAILURE] =
    createRequestActionTypes("main/CALENDAR3"); //타입유형

export const calendarAxios = createAction(CALENDAR); //리덕스의 액션함수
export const calendarAxios2 = createAction(CALENDAR2); //리덕스의 액션함수
export const calendarAxios3 = createAction(CALENDAR3); //리덕스의 액션함수

const calendarSaga = createRequestSaga(CALENDAR, API.SelectCalendar);
const calendarSaga2 = createRequestSaga(CALENDAR2, API.SelectCalendar2);
const calendarSaga3 = createRequestSaga(CALENDAR3, API.SelectCalendar3);

export function* CalendarSaga2() {
    yield takeLatest(CALENDAR, calendarSaga);
    yield takeLatest(CALENDAR2, calendarSaga2);
    yield takeLatest(CALENDAR3, calendarSaga3);
}

const initialState = {
    calendar: [],
    calendarError: null,
    calendar2: [],
    calendar2Error: null,
    calendar3: [],
    calendar3Error: null,
};

// 리듀서 선언부분
const myCalendar = handleActions(
    {
        [CALENDAR_SUCCESS]: (state, { payload: calendar }) => ({
            ...state,
            calendarError: null,
            calendar,
        }),

        [CALENDAR_FAILURE]: (state, { payload: error }) => ({
            ...state,
            calendarError: error,
        }),

        [CALENDAR2_SUCCESS]: (state, { payload: calendar2 }) => ({
            ...state,
            calendar2Error: null,
            calendar2,
        }),

        [CALENDAR2_FAILURE]: (state, { payload: error }) => ({
            ...state,
            calendar2Error: error,
        }),

        [CALENDAR3_SUCCESS]: (state, { payload: calendar3 }) => ({
            ...state,
            calendar3Error: null,
            calendar3,
        }),

        [CALENDAR3_FAILURE]: (state, { payload: error }) => ({
            ...state,
            calendar3Error: error,
        }),
    },
    initialState
);

export default myCalendar;