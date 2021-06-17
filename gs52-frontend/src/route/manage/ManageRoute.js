import React from "react";
const SetHoliday = React.lazy(() => import("../../components/holiday/SetHoliday"));

const ScheduleRoute = [
    { path: "/setholiday", name: "SetHoliday", component: SetHoliday}
];

export default ScheduleRoute;
