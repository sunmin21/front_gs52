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

  
  //출근 시 들어가는 데이터
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

  //퇴근 시 들어가는 데이터
  export const UpdateWorkEnd = async (emp_index, date, end) => {
    console.log("UpdateWorkEnd");
    console.log(emp_index);
    console.log(date);
    console.log(end);
    //(ATTEND_EMP_INDEX, ATTEND_DATE, ATTEND_START, ATTEND_ATTEND_TYPE_INDEX
    const workEnd = await client.post(API_URL + "/workEnd", 
                            {attend_EMP_INDEX:emp_index, 
                                attend_DATE:date, 
                                attend_END:end });
    console.log(workEnd);
    return workEnd;
  };

  //휴식시간 업데이트시 들어가는 데이터
  export const UpdateWorkBreak = async (emp_index, date, break_time) => {
    console.log("UpdateWorkEnd");
    console.log(emp_index);
    console.log(date);
    console.log(break_time);
    //(ATTEND_EMP_INDEX, ATTEND_DATE, ATTEND_START, ATTEND_ATTEND_TYPE_INDEX
    const workBreak = await client.post(API_URL + "/workBreak", 
                            {attend_EMP_INDEX:emp_index, 
                                attend_DATE:date, 
                                attend_BREAK:break_time });
    console.log(workBreak);
    return workBreak;
  };



//출근 했는지 안했는지
export const SelectWorkCheck = async (index, date) => {
    console.log("SelectWorkCheck")  
    console.log(date)

    const workCheck = await client.post(API_URL+"/workCheck",
                            {   attend_EMP_INDEX:index,
                                attend_DATE:date})
    console.log(workCheck);
    return workCheck;
}


//휴식 시작
export const InsertBreakStart = async(index, date, start)=>{

    const breakStart = await client.post(API_URL + "/breakStart", 
                        {break_EMP_INDEX:index, 
                        break_DATE:date, 
                        break_START:start});

                        console.log("breakStart")
                        console.log(breakStart)
    return breakStart;
}
//휴식 끝
export const UpdateBreakEnd = async(index, end, date, userIndex)=>{
    console.log("UpdateBreakEnd")
    console.log(index)
    console.log(end)
    console.log(userIndex)

    const breakEnd = await client.post(API_URL + "/breakEnd", 
                        {break_INDEX:index, 
                            break_END:end}).then((item)=>{
                            
                                UpdateWorkBreak(userIndex, date, item.data );
                            })
                            
                        console.log("breakEnd")
                        console.log(breakEnd)

}