import client from "../client";

const API_URL = "http://localhost:8081";
export const SelectReport = async ({ emp, weekStart, weekEnd }) => {

  // console.log("emp : " + emp + " weekStart : " + weekStart + " weekEnd : " + weekEnd)

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

export const SelectOthersReport = async ({ othersemp, weekStart, weekEnd }) => {

  // console.log("other othersemp : " + othersemp + " weekStart : " + weekStart + " weekEnd : " + weekEnd)

  const othersreport = await client.post(API_URL + "/report/showReport", {
    report_EMP_INDEX: othersemp,
    weekstart: weekStart,
    weekend: weekEnd,
  });

  const nextothersreport = await client.post(API_URL + "/report/showReport", {
    report_EMP_INDEX: othersemp,
    weekstart: weekStart,
    weekend: weekEnd,
  });

  return othersreport, nextothersreport;
};

export const InsertReport = async (emp, contents, targetDate) => {

  var moment = require("moment");
  var event = moment(targetDate).format("YYYY-MM-DD");

  // console.log(
  //   "emp : " + emp + " contents : " + contents + " event : " + event
  // );

  const report = await client.post(API_URL + "/report/addReport", {
    report_EMP_INDEX: emp,
    report_CONTENTS: contents,
    report_TARGET_DATE: event,
  });

  return report;
};

export const DeleteReport = async (id) => {
  // console.log("id(index) : " + id);
  
  const report = await client.post(API_URL + "/report/delReport", {
    report_INDEX: id
  });

  return report;
}

export const EmpList = async () => {
  console.log("emplist 접근")
  const res = await client.post(API_URL + "/report/empList", {
    report_EMP_INDEX : 1
  });

  return res.data
}