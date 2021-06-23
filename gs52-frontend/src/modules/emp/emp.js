import { createAction, handleActions } from "redux-actions";

import produce from "immer";

import { userList } from "src/lib/api/auth/auth";
const SEARCH_CHANGE_FIELD = "emp/SEARCH_CHANGE_FIELD"; //기능에 대한 이름
const SEARCH_CHANGE_FIELD2 = "emp/SEARCH_CHANGE_FIELD2";
const SEARCH_INIT = "emp/SEARCH_INIT";
const USER_LIST = "emp/USER_LIST"; // emp 목록 뽑아오기

// const [USER, TEST_SUCCESS, TEST_FAILURE] =
//   createRequestActionTypes("auth/TEST");

// dispatch할때 필요한 값   액션함수를 만들어줘야해요
export const changeSEARCHADD = createAction(
  SEARCH_CHANGE_FIELD,
  ({ form, 사원번호, 이름, 부서, 팀, 직책 }) => ({
    form,
    key: { 사원번호, 이름, 부서, 팀, 직책 },
  })
);
export const changeSEARCHSUB = createAction(
  SEARCH_CHANGE_FIELD2,
  ({ form, 사원번호 }) => ({
    form,
    사원번호,
  })
);
export const searchInit = createAction(SEARCH_INIT);
// export const userLists = createAction(USER_LIST, () => ({
//   값: userList(),
// }));

export const userLists = () => ({
  type: USER_LIST,
  payload: userList(),
});
const initialState = {
  //초기값을 정의
  search: [],
  user: [
    userList().then((data) => {
      return data.map((item) => {
        return {
          사원번호: item.emp_ID,
          이름: item.emp_NAME,
          부서: item.dept_NAME,
          팀: item.team_NAME,
          직책: item.position_NAME,
          선택: false,
        };
      });
    }),
  ],
};
const emp = handleActions(
  {
    [SEARCH_CHANGE_FIELD]: (state, { payload: { form, key } }) => {
      return produce(state, (draft) => {
        draft[form] = state.search.concat(key);
      });
    },
    [SEARCH_CHANGE_FIELD2]: (state, { payload: { form, 사원번호 } }) => {
      return produce(state, (draft) => {
        draft[form] = state.search.filter((item) => item.사원번호 !== 사원번호);
      });
    },
    [SEARCH_INIT]: (state) => {
      return produce(state, (draft) => {
        draft["search"] = [];
      });
    },
    [USER_LIST]: (state, payload) => {
      // console.log("타냐?");
      // console.log(payload);
      // return produce(state, (draft) => {
      //   draft["user"] =  ;
      // });
    },

    // [USER_LIST]: (state) => {
    //   return produce(state, (draft) => {
    //     draft["user"] = state.user.concat();
    //   });
    // },
  },
  initialState
);

export default emp;
