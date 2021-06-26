import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import manager, { managerSaga } from "./manager/manager";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
import conf_check, { ConfSaga2 } from "./schedule/conf";
import holiday, { holidaySaga2 } from "./manager/holiday";
import report, { reportSaga2 } from "./task/report";
import changeState, { changeStore } from "./changeStore";
import annual, { annualSaga2 } from "./annual/annual";

const rootReducer = combineReducers({
  test,
  manager,
  changeState,
  holiday,
  emp,
  task,
  conf_check,
  annual,
});

export function* rootSaga() {
  yield all([
    taskSaga(),
    holidaySaga2(),
    ConfSaga2(),
    reportSaga2(),
    annualSaga2(),
  ]);
}
export default rootReducer;
