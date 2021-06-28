import { createAction, handleActions } from "redux-actions";

import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/manager/AccountRegist/AccountRegistAPI";
import { takeLatest } from "redux-saga/effects";


//타입유형
const [DEPT_lIST, DEPT_lIST_SUCCESS, DEPT_lIST_FAILURE] = createRequestActionTypes("manager/account/dept_list"); //타입유형
  //const CHECK1 = 'schedule/confRoom_book';

  export const DeptAxios = createAction(DEPT_lIST);

  //export const modalCheck1 = createAction(CHECK1);

  const DeptSaga = createRequestSaga(DEPT_lIST, API.SelectDept);

  export function* AccountSaga() {
    yield takeLatest(DEPT_lIST, DeptSaga);
  }

const initialState = {
  //초기값을 정의
    dept_list: [],
    dept_list_error: null,

    
    //conf_modal1: false,
};

//const holiday = handleActions(
const account = handleActions(
    {
        [DEPT_lIST_SUCCESS]: (state, { payload: dept_list }) => ({
            ...state,
            dept_list_error: null,
            dept_list,
          }),
      
          [DEPT_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            dept_list_error: error,
          }),


        // [CHECK1] : (state) => ({
        //     ...state,
        //     conf_modal1: !state.conf_modal1,
        // }),
    },
    initialState
);

export default account;
