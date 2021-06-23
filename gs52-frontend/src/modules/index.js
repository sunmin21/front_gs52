import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import changeState from "./changeStore";
import emp from "./emp";
import task, { taskSaga } from "./task";
import holiday,{holidaySaga2} from './manager/holiday'
const rootReducer = combineReducers({
  test,
  changeState,
  holiday,
  emp,
  task,
});

export function* rootSaga() {
  yield all([taskSaga(),holidaySaga2()]);
}
export default rootReducer;
