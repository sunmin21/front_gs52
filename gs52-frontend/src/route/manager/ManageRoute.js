import React from "react";
const HolidayManagement = React.lazy(() => import("../../containers/manager/holiday/HolidayManagement"));
// const test = React.lazy(() => import("../../containers/manager/holiday/test"));

const ManagerRoute = [
    { path: "/manager/HolidayManagement", name: "휴일관리", component: HolidayManagement },
    // { path: "/manager/test", name: "test", component:test}
];

export default ManagerRoute;
