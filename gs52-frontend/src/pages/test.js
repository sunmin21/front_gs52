import React, { useState, useEffect } from "react";
import { Home, MyComponent } from "../lib/api/test";
import CotainersTest from "../containers/Test";
import TheSideBar from "../containers/common/TheSidebar";
import { TheLayout } from "../containers/common";

const Test = (props) => {
  const [message, setMessage] = useState("a");

  //   const promiseFn = Home();

  return (
    <>
      <TheLayout />

      {/* <CotainersTest /> */}
    </>
  );
};

export default Test;
