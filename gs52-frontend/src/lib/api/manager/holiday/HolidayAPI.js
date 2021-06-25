import client from "../../client";

export const SelectHoliday = async () => {
  console.log("test");

  const holiday = await client.get("/holiday/showHoliday");

  return holiday;
};

export const InsertHoliday = async (title, date, annual) => {
  console.log("title : " + title + " date : " + date + " annual : " + annual);

  var moment = require("moment");
  var event = moment(date).format("YYYY-MM-DD");

  const holiday = await client
    .post("/holiday/addHoliday", {
      holiday_TITLE: title,
      holiday_DATE: event,
      holiday_ANNUAL_REPEAT: annual,
    })
    .then(function (response) {})
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 항상 실행되는 부분
    });
};

export const DeleteHoliday = async (id) => {
  id = parseInt(id);
  // console.log("id : " + id);
  // console.log(typeof (id));

  const holiday = await client
    .post("/holiday/delHoliday", {
      holiday_INDEX: id,
    })
    .then(function (response) {
      // return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // 항상 실행되는 부분
    });
};
