import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/manager/holiday/HolidayAPI";
import { takeLatest } from "redux-saga/effects";

const [HOLIDAY, HOLIDAY_SUCCESS, HOLIDAY_FAILURE] =
  createRequestActionTypes("manager/HOLIDAY"); //타입유형

export const holidayAxios = createAction(HOLIDAY); //리덕스의 액션함수

const holidaySaga = createRequestSaga(HOLIDAY, API.SelectHoliday);

export function* holidaySaga2() {
    yield takeLatest(HOLIDAY, holidaySaga);
}
const initialState = {
  //초기값을 정의
    holiday: [],
    holiError: null,
};

const holiday = handleActions(
    {
        [HOLIDAY_SUCCESS]: (state, { payload: holiday }) => ({
        ...state,
        holiError: null,
        holiday,
        }),

        [HOLIDAY_FAILURE]: (state, { payload: error }) => ({
        ...state,
        holiError: error,
        }),
    },
    initialState
);

export default holiday;
