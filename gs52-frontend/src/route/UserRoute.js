import AttendanceRoute from "./attendance/AttendanceRoute";
import ScheduleRoute from "./schedule/ScheduleRoute";
import TaskRoute from "./task/TaskRoute";
import MainRoute from "./main/MainRoute";
import EmpRoute from "./emp/EmpRoute";
import MypageRoute from "./mypage/MypageRoute";

const UserRoute = [].concat(
  AttendanceRoute,
  ScheduleRoute,
  TaskRoute,
  MainRoute,
  EmpRoute,
  MypageRoute
);

export default UserRoute;
