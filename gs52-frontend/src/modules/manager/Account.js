import { createAction, handleActions } from "redux-actions";

import createRequestSaga, {createRequestActionTypes} from "../../lib/createRequestSaga";
import * as API from "../../lib/api/manager/Account/AccountRegistAPI";
import { takeLatest } from "redux-saga/effects";


//타입유형
const [TEAM_lIST, TEAM_lIST_SUCCESS, TEAM_lIST_FAILURE] = createRequestActionTypes("manager/account/team_list"); //타입유형
const [RANK_lIST, RANK_lIST_SUCCESS, RANK_lIST_FAILURE] = createRequestActionTypes("manager/account/rank_list"); //타입유형
const [POSITION_lIST, POSITION_lIST_SUCCESS, POSITION_lIST_FAILURE] = createRequestActionTypes("manager/account/position_list"); //타입유형
  //const CHECK1 = 'schedule/confRoom_book';

  export const TeamAxios = createAction(TEAM_lIST);
  export const RankAxios = createAction(RANK_lIST);
  export const PositionAxios = createAction(POSITION_lIST);

  //export const modalCheck1 = createAction(CHECK1);

  const TeamSaga = createRequestSaga(TEAM_lIST, API.SelectTeam);
  const RankSaga = createRequestSaga(RANK_lIST, API.SelectRank);
  const PositionSaga = createRequestSaga(POSITION_lIST, API.SelectPosition);

  export function* AccountSaga() {
    yield takeLatest(TEAM_lIST, TeamSaga);
    yield takeLatest(RANK_lIST, RankSaga);
    yield takeLatest(POSITION_lIST, PositionSaga);
  }

const initialState = {
  //초기값을 정의
    team_list: [],
    team_list_error: null,
    rank_list: [],
    rank_list_error: null,
    position_list: [],
    position_list_error: null,

    
    //conf_modal1: false,
};

//const holiday = handleActions(
const account = handleActions(
    {
        [TEAM_lIST_SUCCESS]: (state, { payload: team_list }) => ({
            ...state,
            team_list_error: null,
            team_list,
          }),
      
          [TEAM_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            team_list_error: error,
          }),

          [RANK_lIST_SUCCESS]: (state, { payload: rank_list }) => ({
            ...state,
            rank_list_error: null,
            rank_list,
          }),
      
          [RANK_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            rank_list_error: error,
          }),

          [POSITION_lIST_SUCCESS]: (state, { payload: position_list }) => ({
            ...state,
            position_list_error: null,
            position_list,
          }),
      
          [POSITION_lIST_FAILURE]: (state, { payload: error }) => ({
            ...state,
            position_list_error: error,
          }),

        // [CHECK1] : (state) => ({
        //     ...state,
        //     conf_modal1: !state.conf_modal1,
        // }),
    },
    initialState
);

export default account;
