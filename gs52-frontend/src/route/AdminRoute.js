import AttendanceRoute from "./attendance/AttendanceRoute";
import ScheduleRoute from "./schedule/ScheduleRoute";
import TaskRoute from "./task/TaskRoute";
import ManageRoute from "./manager/ManageRoute";
import MainRoute from "./main/MainRoute";
import EmpRoute from "./emp/EmpRoute";

const routes = [].concat(
  AttendanceRoute,
  ScheduleRoute,
  TaskRoute,
  ManageRoute,
  MainRoute,
  EmpRoute
);

export default routes;
