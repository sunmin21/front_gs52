import React from "react";
const SetHoliday = React.lazy(() =>
  import("../../containers/manager/holiday/SetHoliday")
);

const ScheduleRoute = [
  { path: "/manager/setholiday", name: "휴일관리", component: SetHoliday },
  { path: "/manager", name: "관리자페이지", component: SetHoliday },
];

export default ScheduleRoute;
