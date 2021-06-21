import React from "react";
const SetHoliday = React.lazy(() => import("../../components/holiday/SetHoliday"));
const InformRegist = React.lazy(() => import("../../containers/informRegist/informLayout"));

const ScheduleRoute = [
    { path: "/setholiday", name: "SetHoliday", component: SetHoliday},
    { path: "/informRegist", name: "informRegist", component: InformRegist}
];

export default ScheduleRoute;
