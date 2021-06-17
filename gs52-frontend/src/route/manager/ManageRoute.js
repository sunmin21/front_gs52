import React from "react";
const SetHoliday = React.lazy(() => import("../../components/manager/holiday/SetHoliday"));

const ScheduleRoute = [
    { path: "/manager/setholiday", name: "휴일관리", component: SetHoliday}
];

export default ScheduleRoute;
