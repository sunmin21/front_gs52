import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/attendance/AnnualAPI";
import { takeLatest } from "redux-saga/effects";

const [ANNUAL, ANNUAL_SUCCESS, ANNUAL_FAILURE] =
  createRequestActionTypes("annual/ANNUAL"); //타입유형
const [EMPVACATION, EMPVACATION_SUCCESS, EMPVACATION_FAILURE] =
  createRequestActionTypes("annual/EMPVACATION"); //타입유형

export const annualAxios = createAction(ANNUAL); //리덕스의 액션함수
export const empvacationAxios = createAction(EMPVACATION); //리덕스의 액션함수

const annualSaga = createRequestSaga(ANNUAL, API.SelectVacation);
const empvacationSaga = createRequestSaga(EMPVACATION, API.SelectEmpVacation);

export function* annualSaga2() {
  yield takeLatest(ANNUAL, annualSaga);
  yield takeLatest(EMPVACATION, empvacationSaga);
}
const initialState = {
  //초기값을 정의
  annual: [],
  empvacation: [],
  annualError: null,
  empvacationError: null,
};

const annual = handleActions(
  {
    [ANNUAL_SUCCESS]: (state, { payload: annual }) => ({
      ...state,
      annualError: null,
      annual,
    }),

    [ANNUAL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      annualError: error,
    }),
    [EMPVACATION_SUCCESS]: (state, { payload: empvacation }) => ({
      ...state,
      empvacationError: null,
      empvacation,
    }),
    [EMPVACATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      empvacationError: error,
    }),
  },
  initialState
);

export default annual;
