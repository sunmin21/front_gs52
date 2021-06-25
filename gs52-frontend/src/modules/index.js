import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import manager, { managerSaga } from "./manager/addOptions";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
import holiday, { holidaySaga2 } from "./manager/holiday";
import changeState from "./changeStore";
const rootReducer = combineReducers({
  test,
  manager,
  changeState,
  holiday,
  emp,
  task,
});

export function* rootSaga() {
  yield all([taskSaga(), holidaySaga2(), managerSaga()]);
}
export default rootReducer;
