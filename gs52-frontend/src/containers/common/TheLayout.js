import React, { useState } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";

import {getCurrentUser} from "../../lib/api/jwt/LoginAPI";

const TheLayout = (props) => {
  const { location } = props;
  const [nav, setNav] = useState([]);

  const user = getCurrentUser();

  console.log("THE LAYOUTTTTTTTTTTTTTTTTTTT")
  console.log("↓↓↓↓ 현재 로그인한 유저 정보 ↓↓↓↓")
  console.log(user)

  if (location.pathname === "/manager" && (user.roles=="ROLE_ADMIN" || user.roles=="ROLE_TEAMLEADER")) {
    import("../manager/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/schedule") {
    import("../schedule/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/task") {
    import("../task/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/attendance") {
    import("../attendance/sidebar_nav").then((nav) => setNav(nav.default));
  } else if (location.pathname === "/") {
    import("../main/sidebar_nav").then((nav) => setNav(nav.default));
  }

  const contentStyle = {
    backgroundColor: "white",
    // margin: "35px 10px 35px 100px",
    borderRadius: "5px",
    boxShadow: "5px 5px 5px gray",
  }

  return (
    <>
      <div className="c-app c-default-layout"
        // style={{ background: "linear-gradient( 184deg, #C6FFFF, #48E6FE, #489CFF 55%, #f5f5f5 55% )" }}
        // style={{ background: "linear-gradient(white, #C6FFFF, #48E6FE, #489CFF)" }}
      >
        <TheSidebar nav={nav} />
        <div className="c-wrapper" >
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          {/* <TheFooter /> */}
        </div>
        </div>
    </>
  );
};

export default TheLayout;
