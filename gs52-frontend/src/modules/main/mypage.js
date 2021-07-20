import { createAction, handleActions } from "redux-actions";
import moment from 'moment';

import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/myPage/MyPage";
import { takeLatest } from "redux-saga/effects";


//타입유형
const [EMP_lIST, EMP_lIST_SUCCESS, EMP_lIST_FAILURE] = createRequestActionTypes("main/mypage_emp"); //타입유형

  export const EmpAxios = createAction(EMP_lIST);

  const EmpSaga = createRequestSaga(EMP_lIST, API.SelectEmp);

  export function* mypageSaga2() {
    yield takeLatest(EMP_lIST, EmpSaga);
  }

const initialState = {
  //초기값을 정의
    emp_list: [],
    emp_list_error: null,
};

//const holiday = handleActions(
const mypage = handleActions(
    {
        [EMP_lIST_SUCCESS]: (state, { payload: emp_list }) => ({
            ...state,
            emp_list_error: null,
            emp_list,
          }),
      
          [EMP_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            emp_list_error: error,
          }),

        
    },
    initialState
);

export default mypage;
