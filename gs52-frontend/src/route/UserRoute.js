import AttendanceRoute from "./attendance/AttendanceRoute";
import ScheduleRoute from "./schedule/ScheduleRoute";
import TaskRoute from "./task/TaskRoute";
import MainRoute from "./main/MainRoute";
import EmpRoute from "./emp/EmpRoute";

const UserRoute = [].concat(
  AttendanceRoute,
  ScheduleRoute,
  TaskRoute,
  MainRoute,
  EmpRoute
);

export default UserRoute;
