import report from "src/modules/task/report";
import client from "../client";

const API_URL = "http://localhost:8081";
export const SelectReport = async ({ emp, weekStart, weekEnd }) => {
  console.log(
    "emp : " + emp + " weekstart : " + weekStart + " weekend : " + weekEnd
  );

  const report = await client.post(API_URL + "/report/showReport", {
    report_EMP_INDEX: emp,
    weekstart: weekStart,
    weekend: weekEnd,
  });

  return report;
};

export const InsertReport = async ({ emp, contents, targetDate }) => {
  console.log(
    "emp : " + emp + " contents : " + contents + " targetDate : " + targetDate
  );

  const report = await client.post(API_URL + "/report/addReport", {
    report_EMP_INDEX: emp,
    report_CONTNETS: contents,
    report_TARGET_DATE: targetDate,
  });

  return report;
};

export const DeleteReport = async ({ id }) => {
  console.log("id(index) : " + id);
  
  const report = await client.post(API_URL + "/report/delReport", {
    report_INDEX : id
  });

return report;
}