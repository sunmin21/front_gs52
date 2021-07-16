import moment from "moment";
import client from "../client";

const API_URL = "http://192.168.20.17:8081";
export const SelectNotice = async (NOTICE_INDEX) => {
  const notice = await client.get(API_URL + "/main/notice", {
    params: { notice_INDEX: NOTICE_INDEX },
  });

  return notice;
};

export const InsertNotice = async ({ 제목, 내용, 작성자INDEX }) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const notice = await client.post(API_URL + "/main/addNotice", {
    notice_TITLE: 제목,
    notice_CONTENTS: 내용,
    notice_EMP_INDEX: 작성자INDEX || 2,
    notice_DATE: date,
  });
  return notice;
};
export const DeleteNotice = async (인덱스) => {
  const notice = await client.post(API_URL + "/main/deleteNotice", {
    notice_INDEX: 인덱스,
  });
  return notice;
};

export const UpdateNotice = async ({
  notice_TITLE,
  notice_CONTENTS,
  notice_INDEX,
}) => {
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const notice = await client.post(API_URL + "/main/updateNotice", {
    notice_INDEX: notice_INDEX,
    notice_TITLE: notice_TITLE,
    notice_CONTENTS: notice_CONTENTS,
    notice_DATE: date,
  });
  return notice;
};
