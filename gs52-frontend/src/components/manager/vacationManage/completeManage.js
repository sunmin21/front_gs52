import React from "react";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CPagination,
  CRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { vacationAxios } from "src/modules/manager/vacation";
import { sendAxios, succssAxios, todoAxios } from "src/modules/task/task";

const getBadge = (status) => {
  switch (status) {
    case "완료":
      return "success";
    case "Inactive":
      return "secondary";
    case "대기중":
      return "warning";
    case "거절":
      return "danger";
    default:
      return "primary";
  }
};
const CompleteManage = ({
  content,
  pageCount,
  success,
  remove,
  reject,
  userid,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(vacationAxios());
  }, [dispatch]);
  const Done = {
    0: "대기중",
    1: "완료",
    2: "거절",
  };
  const completeData = content
    .filter((item) => item.vacation_STATUS == 1 || item.vacation_STATUS == 2)
    .map((item) => ({
      emp_NAME: item.emp_NAME,
      vacation_DATE: item.vacation_DATE,
      vacation_CONTENTS: item.vacation_CONTENTS,
      vacation_STATUS: item.vacation_STATUS,
      vacation_EMP_INDEX: item.vacation_EMP_INDEX,
      attend_TYPE_NAME: item.attend_TYPE_NAME,
      emp_ID: item.emp_ID,
    }));

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <small className="text-muted"> </small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={completeData}
              fields={[
                { key: "보낸사람", _classes: "font-weight-bold" },
                { key: "내용", _style: { width: "60%", textAlign: "center" } },
                {
                  key: "종류",
                  _style: { width: "10%", textAlign: "center" },
                },
                {
                  key: "요청날짜",
                  _style: { width: "10%", textAlign: "center" },
                },
                {
                  key: "상태",
                  _style: { width: "10%", textAlign: "center" },
                },
              ]}
              hover
              striped
              itemsPerPage={10}
              clickableRows
              pagination
              // onRowClick={(item) =>
              //   history.push(`/task/schedule/SendContent/${item.id}`)
              // }
              scopedSlots={{
                보낸사람: (item) => {
                  console.log(item);
                  return <td>{item.emp_NAME}</td>;
                },
                내용: (item) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      // onClick={() =>
                      //   history.push(`/task/schedule/SendContent/${item.id}`)
                      // }
                    >
                      {item.vacation_CONTENTS}
                    </td>
                  );
                },
                종류: (item) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      // onClick={() =>
                      //   history.push(`/task/schedule/SendContent/${item.id}`)
                      // }
                    >
                      {item.attend_TYPE_NAME}
                    </td>
                  );
                },
                요청날짜: (item) => (
                  <td style={{ textAlign: "center" }}>{item.vacation_DATE}</td>
                ),
                상태: (item) => (
                  <td>
                    <h4 style={{ textAlign: "center" }}>
                      <CBadge color={getBadge(Done[item.vacation_STATUS])}>
                        {Done[item.vacation_STATUS]}
                      </CBadge>
                    </h4>
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default React.memo(CompleteManage);
