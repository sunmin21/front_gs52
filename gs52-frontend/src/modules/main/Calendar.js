// 리덕스
import { createAction, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../../lib/createRequestSaga";
import * as API from "../../lib/api/main/Calendar";
import { takeLatest } from "redux-saga/effects";

const [CALENDAR, CALENDAR_SUCCESS, CALENDAR_FAILURE] =
    createRequestActionTypes("main/CALENDAR2"); //타입유형

export const calendarAxios = createAction(CALENDAR); //리덕스의 액션함수

const calendarSaga = createRequestSaga(CALENDAR, API.SelectCalendar);

export function* CalendarSaga2() {
    yield takeLatest(CALENDAR, calendarSaga);
}

const initialState = {
    calendar: [],
    calendarError: null,
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
    },
    initialState
);

export default myCalendar;