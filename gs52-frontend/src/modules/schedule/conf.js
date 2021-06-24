import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
// import * as API from "../../lib/api/manager/holiday/HolidayAPI";
import { takeLatest } from "redux-saga/effects";

const [HOLIDAY, HOLIDAY_SUCCESS, HOLIDAY_FAILURE] =
  createRequestActionTypes("manager/HOLIDAY"); //타입유형

  const CHECK1 = 'schedule/confRoom_book';
  const CHECK2 = 'schedule/confRoom_emp';
  const DATE = 'schedule/confRoom_date';
  const TIME = 'schedule/confRoom_time';

  export const modalCheck1 = createAction(CHECK1);
  export const modalCheck2 = createAction(CHECK2);
  export const modalDate = createAction(DATE);
  export const modalTime = createAction(TIME);
//export const holidayAxios = createAction(HOLIDAY); //리덕스의 액션함수

// const holidaySaga = createRequestSaga(HOLIDAY, API.SelectHoliday);

// export function* holidaySaga2() {
//     yield takeLatest(HOLIDAY, holidaySaga);
// }

const initialState = {
  //초기값을 정의
    holiday: [],
    holiError: null,
    
    conf_modal1: false,
    conf_modal2: false,
    conf_date:'',
    conf_time:'09:00',
};

//const holiday = handleActions(
const conf_check = handleActions(
    {

        [CHECK1] : (state) => ({
            ...state,
            conf_modal1: !state.conf_modal1,
        }),
        [CHECK2] : (state) => ({
            ...state,
            conf_modal1: !state.conf_modal2,
        }),
        [DATE] : (state,{ payload: conf_date }) => ({
            ...state,
            conf_date : conf_date,
        }),
        [TIME] : (state,{ payload: conf_time }) => ({
            ...state,
            conf_time : conf_time,
        }),
    },
    initialState
);

export default conf_check;
