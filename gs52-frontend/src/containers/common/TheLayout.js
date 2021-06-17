import React, { useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import navigation2 from "../attendance/sidebar_nav";


const TheLayout = (props) => {
  const { location } = props;
  const [nav, setNav] = useState([]);
  console.log("@@?");

  if (location.pathname === "/manager") {
    import("../manager/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/schedule") {
    console.log("여기탓냐");
    import("../schedule/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/task") {
    import("../task/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/attendance") {
    import("../attendance/sidebar_nav").then((nav) => setNav(nav.default));
  }

  return (
    <>
      <div className="c-app c-default-layout">
        <TheSidebar nav={nav} />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    </>
  );
};

export default TheLayout;
