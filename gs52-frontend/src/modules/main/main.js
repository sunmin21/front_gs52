import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/main/Main";
import { takeLatest } from "redux-saga/effects";

const [NOTICE, NOTICE_SUCCESS, NOTICE_FAILURE] =
  createRequestActionTypes("task/REPORT"); //타입유형

const USER_STATE = 'main/USER_STATE'

export const noticeAxios = createAction(NOTICE); //리덕스의 액션함수
export const user_state = createAction(USER_STATE);

const NoticeSaga = createRequestSaga(NOTICE, API.SelectNotice);

export function* MainSaga() {
  yield takeLatest(NOTICE, NoticeSaga);
}
const initialState = {
  //초기값을 정의
  notice: [],
  noticeError: null,
  
  user_inform: [
    {
      id: "",
      name: "",
      email: "",
    },
  ]
};

// 리듀서 선언부분
const main = handleActions(
  {
    [NOTICE_SUCCESS]: (state, { payload: notice }) => ({
      ...state,
      noticeError: null,
      notice,
    }),

    [NOTICE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      reporError: error,
    }),
    [USER_STATE] : (state,{payload:user_state}) => ({
      ...state,
      user_inform : user_state,
    })
  },
  initialState
);

export default main;
