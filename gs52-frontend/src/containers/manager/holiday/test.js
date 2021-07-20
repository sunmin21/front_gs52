import React from "react";

const holidays = require("holiday-kr");

holidays.serviceKey =
  "3jlX0R0w77a3kr%2Fs9myyQ%2BeCOmPoNCgw1vJzO1%2B%2B8B6g%2F0fj09I2I0i75fy2gDfGo8mxZeEEYnCzj%2FmKUosHlw%3D%3D";

holidays
  .getHolidays({
    year: 2020,
    month: 1,
    monthCount: 10,
  })
  .then((list) => {});
