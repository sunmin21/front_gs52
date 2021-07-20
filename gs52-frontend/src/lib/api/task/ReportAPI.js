import client from "../client";

const API_URL = "http://192.168.20.17:8081";
export const SelectReport = async ({ emp, weekStart, weekEnd }) => {
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

  const report = await client.post(API_URL + "/report/addReport", {
    report_EMP_INDEX: emp,
    report_CONTENTS: contents,
    report_TARGET_DATE: event,
  });

  return report;
};

export const DeleteReport = async (id) => {
  const report = await client.post(API_URL + "/report/delReport", {
    report_INDEX: id,
  });

  return report;
};

export const EmpList = async (index) => {
  const res = await client.post(API_URL + "/report/empList", {
    report_EMP_INDEX: index,
  });

  return res.data;
};
