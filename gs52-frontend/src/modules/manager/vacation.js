import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/manager/VacationManage/VacationAPI";
import { takeLatest } from "redux-saga/effects";

const [VACATION, VACATION_SUCCESS, VACATION_FAILURE] =
  createRequestActionTypes("manager/VACATION"); //타입유형

export const vacationAxios = createAction(VACATION); //리덕스의 액션함수

const vacationSaga = createRequestSaga(VACATION, API.SelectVacation);

export function* vacationSaga2() {
  yield takeLatest(VACATION, vacationSaga);
}
const initialState = {
  //초기값을 정의
  vacation: [],
  vacationError: null,
};

const vacation = handleActions(
  {
    [VACATION_SUCCESS]: (state, { payload: vacation }) => ({
      ...state,
      vacationError: null,
      vacation,
    }),

    [VACATION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      vacationError: error,
    }),
  },
  initialState
);

export default vacation;
