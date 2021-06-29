import client from "../client";

const API_URL = "http://localhost:8081";
export const SelectReport = async ({ emp, weekStart, weekEnd }) => {

  // console.log("this is selectreport zone -----------")
  // console.log(
  //   "emp : " + emp + " weekstart : " + weekStart + " weekend : " + weekEnd
  // );

  const report = await client.post(API_URL + "/report/showReport", {
    report_EMP_INDEX: emp,
    weekstart: weekStart,
    weekend: weekEnd,
  });

  const nextreport = await client.post(API_URL + "/report/showReport", {
    report_EMP_INDEX: emp,
    weekstart: weekStart,
    weekend: weekEnd,
  });

  return report, nextreport;
};

// export const InsertReport = async ({ emp, contents, targetDate }) => {

export const InsertReport = async (emp, contents, targetDate) => {

  var moment = require("moment");
  var event = moment(targetDate).format("YYYY-MM-DD");

  console.log(
    "emp : " + emp + " contents : " + contents + " event : " + event
  );

  const report = await client.post(API_URL + "/report/addReport", {
    report_EMP_INDEX: emp,
    report_CONTENTS: contents,
    report_TARGET_DATE: event,
  });

  return report;
};

// export const DeleteReport = async ({ id }) => {

export const DeleteReport = async (id) => {
  console.log("id(index) : " + id);
  
  const report = await client.post(API_URL + "/report/delReport", {
    report_INDEX : id
  });

return report;
}