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
