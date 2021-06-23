import AttendanceRoute from "./attendance/AttendanceRoute";
import ScheduleRoute from "./schedule/ScheduleRoute";
import TaskRoute from "./task/TaskRoute";
import ManageRoute from "./manager/ManageRoute";

const routes = [].concat(
  AttendanceRoute,
  ScheduleRoute,
  TaskRoute,
  ManageRoute
);

export default routes;
