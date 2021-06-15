import React, { useState, useEffect } from "react";
import { Home, MyComponent } from "../lib/api/test";
import CotainersTest from "../containers/Test";
const Test = () => {
  const [message, setMessage] = useState("a");

  //   const promiseFn = Home();

  return (
    <>
      <CotainersTest />
    </>
  );
};

export default Test;
