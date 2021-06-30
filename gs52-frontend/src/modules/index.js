import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import manager, { managerSaga } from "./manager/addOptions";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
import conf_check, { ConfSaga2 } from "./schedule/conf";
import holiday, { holidaySaga2 } from "./manager/holiday";
import report, { reportSaga2 } from "./task/report";
import changeState, { changeStore } from "./changeStore";
import annual, { annualSaga2 } from "./annual/annual";
import account, { AccountSaga } from "./manager/Account";
import main, { MainSaga } from "./main/main";
import memberSchedule, { memberScheduleSaga2 } from "./annual/memberSchedule";
import vacation, { vacationSaga2 } from "./manager/vacation";
const rootReducer = combineReducers({
  test,
  manager,
  changeState,
  holiday,
  emp,
  task,
  conf_check,
  annual,
  account,
  memberSchedule,
  report,
  main,
  vacation,
});

export function* rootSaga() {
  yield all([
    taskSaga(),
    holidaySaga2(),
    ConfSaga2(),
    reportSaga2(),
    annualSaga2(),
    managerSaga(),
    AccountSaga(),
    memberScheduleSaga2(),
    MainSaga(),
    vacationSaga2(),
  ]);
}
export default rootReducer;
