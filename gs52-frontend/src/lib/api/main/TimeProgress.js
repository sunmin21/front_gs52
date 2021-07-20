import client from "../client";

import React, { useState } from "react";

const API_URL = "http://192.168.20.17:8081/main/TimeProgress";

export const SelectTotal = async (userIndex, date) => {
  const onday = await client.post(API_URL + "/oneday_total", {
    attend_EMP_INDEX: userIndex,
    attend_DATE: date,
  });
  return onday;
};

export const SelectWeekTotal = async (userIndex, date) => {
  const onday = await client.post(API_URL + "/oneweek_total", {
    attend_EMP_INDEX: userIndex,
    attend_DATE: date,
  });

  return onday;
};

export const SelectVacation = async (userIndex, date) => {
  const vacation = await client.post(API_URL + "/selectVacation", {
    attend_EMP_INDEX: userIndex,
    attend_DATE: date,
  });

  return vacation;
};
