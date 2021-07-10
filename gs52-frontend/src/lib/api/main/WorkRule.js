import client from "../client";

import React, { useState } from "react";

const API_URL = "http://localhost:8081/main/WorkTime";

export const SelectWorkRule = async (team) => {
    console.log("SelectWorkRule");
    console.log(team);
    const workRule = await client.post(API_URL + "/workRule", { emp_TEAM_INDEX: team });
    console.log(workRule);
    return workRule;
  };

  
export const SelectWorkStart = async (emp_index, date, start, type_index) => {
    console.log("SelectWorkStart");
    console.log(emp_index);
    console.log(date);
    console.log(start);
    console.log(type_index);
    //(ATTEND_EMP_INDEX, ATTEND_DATE, ATTEND_START, ATTEND_ATTEND_TYPE_INDEX
    //const workStart = await client.post(API_URL + "/workStart", {attend_EMP_INDEX:emp_index, attend_DATE:date, attend_START:start, attend_ATTEND_TYPE_INDEX:type_index });
    const workStart = await client.post(API_URL + "/workStart", 
                            {attend_EMP_INDEX:'1', attend_DATE:'2021/07/11', attend_START:'01:16', attend_ATTEND_TYPE_INDEX:'1',work_RULE_WORK_TYPE_INDEX:'1' });
    console.log(workStart);
    return workStart;
  };