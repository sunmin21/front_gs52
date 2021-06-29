import { createAction, handleActions } from "redux-actions";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/main/Main";
import { takeLatest } from "redux-saga/effects";

const [NOTICE, NOTICE_SUCCESS, NOTICE_FAILURE] =
  createRequestActionTypes("main/NOTICE"); //타입유형

export const noticeAxios = createAction(NOTICE); //리덕스의 액션함수

const NoticeSaga = createRequestSaga(NOTICE, API.SelectNotice);

export function* MainSaga() {
  yield takeLatest(NOTICE, NoticeSaga);
}
const initialState = {
  //초기값을 정의
  notice: [
    {
      인덱스: "",
      제목: "",
      내용: "",
      작성자INDEX: "",
      작성자: "",
      등록날짜: "",
    },
  ],
  noticeError: null,
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
  },
  initialState
);

export default main;
