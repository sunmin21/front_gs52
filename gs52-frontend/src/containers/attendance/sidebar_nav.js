const _nav = [
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "근태관리",
  //   to: "/atendance",
  //   icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  //   badge: {
  //     color: "success",
  //     text: "사용",
  //   },
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["구성원스케줄"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "구성원스케줄",
    to: "/attendance/schedule",
    icon: "cil-pencil",
  },
  {
    _tag: "CSidebarNavItem",
    name: "연차/반차",
    to: "/attendance/AnnualManagement",
    icon: "cil-happy",
  },
  {
    _tag: "CSidebarNavItem",
    name: "출장/외근",
    to: "/attendance/BusinessTrip",
    icon: "cil-happy",
  },
  {
    _tag: "CSidebarNavItem",
    name: "인사이트",
    to: "/attendance/insight",
    icon: "cil-chart-pie",
  },
];

export default _nav;
