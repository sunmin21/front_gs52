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

  
export const SelectWorkStart = async (emp_index, date, start, type_index, workRule_workTypeIndex, workRule_START) => {
    console.log("SelectWorkStart");
    console.log(emp_index);
    console.log(date);
    console.log(start);
    console.log(type_index);
    console.log(workRule_START);
    //(ATTEND_EMP_INDEX, ATTEND_DATE, ATTEND_START, ATTEND_ATTEND_TYPE_INDEX
    const workStart = await client.post(API_URL + "/workStart", 
                            {attend_EMP_INDEX:emp_index, 
                                attend_DATE:date, 
                                attend_START:start, 
                                attend_ATTEND_TYPE_INDEX:type_index, 
                                work_RULE_WORK_TYPE_INDEX:workRule_workTypeIndex, 
                                work_RULE_START:workRule_START  });
    console.log(workStart);
    return workStart;
  };


export const SelectWorkCheck = async (index, date) => {
    console.log("SelectWorkCheck")
    console.log(date)

    const workCheck = await client.post(API_URL+"/workCheck",
                            {   attend_EMP_INDEX:index,
                                attend_DATE:date})
    console.log(workCheck);
    return workCheck;
}