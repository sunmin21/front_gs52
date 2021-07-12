import { createAction, handleActions } from "redux-actions";

import produce from "immer";

import { EmpList } from "../../lib/api/task/ReportAPI";

// 기능 정의
const SEARCH_CHANGE_FIELD = "emp/SEARCH_CHANGE_FIELD";
const SEARCH_CHANGE_FIELD2 = "emp/SEARCH_CHANGE_FIELD2";
const SEARCH_INIT = "emp/SEARCH_INIT";
const EMP_LIST = "emp/EMP_LIST"; // emp 목록 뽑기

// dispatch할때 필요한 값
export const changeSEARCHADD = createAction(
    SEARCH_CHANGE_FIELD,
    ({ form, 사원번호, 이름, 부서, 팀, 직급, 직책 }) => ({
        form,
        key: { 사원번호, 이름, 부서, 팀, 직급, 직책 },
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
// export const userLists = createAction(EMP_LIST, () => ({
//   값: EmpList(),
// }));

export const EmpLists = () => ({
    type: EMP_LIST,
    payload: EmpList(),
});
const initialState = {
  //초기값을 정의
    search: [],
    user: [
        EmpList().then((data) => {
            return data.map((item) => {
                return {
                    사원번호: item.emp_ID,
                    이름: item.emp_NAME,
                    부서: item.dept_NAME,
                    팀: item.team_NAME,
                    직급: item.rank_NAME,
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
        [EMP_LIST]: (state, payload) => {
        
        },
    },
    initialState
);

export default emp;
