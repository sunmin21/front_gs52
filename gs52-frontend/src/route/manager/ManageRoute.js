import React from "react";
const HolidayManagement = React.lazy(() => import("../../containers/manager/holiday/HolidayManagement"));

const ManagerRoute = [
    { path: "/manager/HolidayManagement", name: "휴일관리", component: HolidayManagement },
];

export default ManagerRoute;
