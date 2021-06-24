// import { createAction, handleActions } from "redux-actions";


// //action type 정의하기
// const ConfModal = "conf/CONFMODAL"
// const EmpModal = "conf/EMPMODAL"

// //auction type 반환 함수
// //export const ConfModal = () => ({type:CONFMODAL});
// //export const EmpModal = () => ({type:EMPMODAL});

// //위 함수를 간단하게
// export const ConfModal = createAction(CONFMODAL);
// export const EmpModal = createAction(EMPMODAL);

// //초기상태 작성
// const initialState={
//     confCheck:false,
//     empCheck:false
// }

// //첫번째 인자로는 각 액션타입에 대한 함수가 담긴 객체, 두번째 인자로는 초기값을 전해주기
// const counter = handleActions(
//     {
//         [confCheck] : (state, action) => ({
//             confCheck:false
//         }),
//         [empCheck] : (state, action) => ({
//             empCheck:false
//         })
//     },
//     initialState
// );
