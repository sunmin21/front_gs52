import { createAction, handleActions } from "redux-actions";
import moment from 'moment';

import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/conf/ConfAPI";
import { takeLatest } from "redux-saga/effects";


//타입유형
const [CONF_lIST, CONF_lIST_SUCCESS, CONF_lIST_FAILURE] = createRequestActionTypes("schedule/confRoom_conf"); //타입유형
const [CONF_FLOOR, CONF_FLOOR_SUCCESS, CONF_FLOOR_FAILURE] = createRequestActionTypes("schedule/confRoom_floor"); //타입유형
const [CONF_ROOM, CONF_ROOM_SUCCESS, CONF_ROOM_FAILURE] = createRequestActionTypes("schedule/confRoom_room"); //타입유형
  const CHECK1 = 'schedule/confRoom_book';
  const CHECK2 = 'schedule/confRoom_emp';
  const DATE = 'schedule/confRoom_date';
  const STARTTIME = 'schedule/confRoom_starttime';
  const ENDTIME = 'schedule/confRoom_endtime';

  export const ConfAxios = createAction(CONF_lIST);
  export const FloorAxios = createAction(CONF_FLOOR);
  export const RoomAxios = createAction(CONF_ROOM);

  export const modalCheck1 = createAction(CHECK1);
  export const modalCheck2 = createAction(CHECK2);
  export const modalDate = createAction(DATE);
  export const modalStartTime = createAction(STARTTIME);
  export const modalEndTime = createAction(ENDTIME);

  const ConfSaga = createRequestSaga(CONF_lIST, API.SelectConf);
  const FloorSaga = createRequestSaga(CONF_FLOOR, API.SelectRoomFloor);
  const RoomSaga = createRequestSaga(CONF_ROOM, API.SelectRoom);

  export function* ConfSaga2() {
    yield takeLatest(CONF_lIST, ConfSaga);
    yield takeLatest(CONF_FLOOR, FloorSaga);  
    yield takeLatest(CONF_ROOM, RoomSaga);  
  }

const initialState = {
  //초기값을 정의
    conf_list: [],
    conf_list_error: null,
    floor_list:[],
    floor_list_error: null,
    room_list:[],
    room_list_error: null,

    
    conf_modal1: false,
    conf_modal2: false,
    conf_date:moment().format('YYYY/MM/DD'),
    conf_startTime:'09:00',
    conf_endTime:'09:30',
};

//const holiday = handleActions(
const conf_check = handleActions(
    {
        [CONF_lIST_SUCCESS]: (state, { payload: conf_list }) => ({
            ...state,
            conf_list_error: null,
            conf_list,
          }),
      
          [CONF_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            conf_list_error: error,
          }),

          [CONF_FLOOR_SUCCESS]: (state, { payload: floor_list }) => ({
            ...state,
            floor_list_error: null,
            floor_list: floor_list,
          }),
      
          [CONF_FLOOR_FAILURE]: (state, { payload: error }) => ({
            ...state,
            floor_list_error: error,
          }),

          [CONF_ROOM_SUCCESS]: (state, { payload: room_list }) => ({
            ...state,
            room_list_error: null,
            room_list: room_list,
          }),
      
          [CONF_ROOM_FAILURE]: (state, { payload: error }) => ({
            ...state,
            room_list_error: error,
          }),


        [CHECK1] : (state) => ({
            ...state,
            conf_modal1: !state.conf_modal1,
        }),
        [CHECK2] : (state) => ({
            ...state,
            conf_modal2: !state.conf_modal2,
        }),
        [DATE] : (state,{ payload: conf_date }) => ({
            ...state,
            conf_date : conf_date,
        }),
        [STARTTIME] : (state,{ payload: conf_startTime }) => ({
            ...state,
            conf_startTime : conf_startTime,
        }),
        [ENDTIME] : (state,{ payload: conf_endTime }) => ({
            ...state,
            conf_endTime : conf_endTime,
        }),
    },
    initialState
);

export default conf_check;
