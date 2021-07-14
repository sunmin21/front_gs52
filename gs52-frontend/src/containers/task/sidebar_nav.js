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
    _children: ["업무관리"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "업무진행사항",
    to: "/task/schedule",
    icon: "cil-sun",
  },
  {
    _tag: "CSidebarNavItem",
    name: "주간업무보고",
    to: "/task/report",
    icon: "cil-Notes",
  },
];

export default _nav;
