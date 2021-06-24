import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import test from "./test";
import manager, { managerSaga } from "./manager/manager";
import emp from "./emp/emp";
import task, { taskSaga } from "./task/task";
import holiday,{holidaySaga2} from './manager/holiday'
import changeState from './changeStore';
import conf_check from './schedule/conf'

const rootReducer = combineReducers({
  test,
  manager,
  changeState,
  holiday,
  emp,
  task,
  conf_check
});

export function* rootSaga() {
  yield all([taskSaga(),holidaySaga2()]);
}
export default rootReducer;
