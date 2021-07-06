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
import { UpdateVacationStatus } from "src/lib/api/manager/VacationManage/VacationAPI";
import { UpdateVacation } from "src/lib/api/attendance/AnnualAPI";

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
const AttendManage = ({
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
  console.log(content);

  const attendData = content
    .filter(
      (item) =>
        (item.vacation_ATTEND_INFO_INDEX == 7 ||
          item.vacation_ATTEND_INFO_INDEX == 8 ||
          item.vacation_ATTEND_INFO_INDEX == 9) &&
        item.vacation_STATUS == 0
    )
    .map((item) => ({
      emp_NAME: item.emp_NAME,
      vacation_DATE: item.vacation_DATE,
      vacation_CONTENTS: item.vacation_CONTENTS,
      vacation_STATUS: item.vacation_STATUS,
      vacation_EMP_INDEX: item.vacation_EMP_INDEX,
      attend_TYPE_NAME: item.attend_TYPE_NAME,
      emp_ID: item.emp_ID,
      vacation_INDEX: item.vacation_INDEX,
      vacation_ATTEND_INFO_INDEX: item.vacation_ATTEND_INFO_INDEX,
    }));

  console.log(attendData);
  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            연차/반차
            <small className="text-muted"> </small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={attendData}
              fields={[
                { key: "보낸사람", _classes: "font-weight-bold" },
                { key: "내용", _style: { width: "40%", textAlign: "center" } },
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
                {
                  key: "완료",
                  _style: { width: "10%", textAlign: "center" },
                },
                {
                  key: "거절",
                  _style: { width: "10%", textAlign: "center" },
                },
              ]}
              sorterValue={{ column: "요청날짜", desc: "true" }}
              hover
              striped
              itemsPerPage={10}
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
                완료: (item) => (
                  <td>
                    <CButton
                      active
                      block
                      color="success"
                      onClick={async (e) => {
                        await UpdateVacationStatus(
                          1,
                          item.vacation_INDEX,
                          item.vacation_DATE,
                          item.vacation_ATTEND_INFO_INDEX,
                          item.vacation_EMP_INDEX
                        );
                        dispatch(vacationAxios());
                      }}
                      aria-pressed="true"
                      value={item.vacation_INDEX}
                      name={2}
                    >
                      완료
                    </CButton>
                  </td>
                ),
                거절: (item) => (
                  <td>
                    <CButton
                      active
                      block
                      color="danger"
                      onClick={async (e) => {
                        await UpdateVacationStatus(
                          2,
                          item.vacation_INDEX,
                          item.vacation_DATE,
                          item.vacation_ATTEND_INFO_INDEX,
                          item.vacation_EMP_INDEX
                        );
                        dispatch(vacationAxios());
                        if (item.attend_TYPE_NAME.includes("반차")) {
                          await UpdateVacation(0.5, item.emp_ID);
                        } else {
                          await UpdateVacation(1, item.emp_ID);
                        }
                      }}
                      aria-pressed="true"
                      value={item.vacation_INDEX}
                      name={1}
                    >
                      거절
                    </CButton>
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

export default React.memo(AttendManage);
