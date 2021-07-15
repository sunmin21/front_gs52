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
import { UpdateVacationStatus } from "src/lib/api/manager/VacationManage/VacationAPI";
import { vacationAxios } from "src/modules/manager/vacation";
import { Badge, Button } from "antd";

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
const BusinessManage = ({
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
  const businessData = content
    .filter(
      (item) =>
        (item.vacation_ATTEND_INFO_INDEX == 5 ||
          item.vacation_ATTEND_INFO_INDEX == 6) &&
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

  return (
    <CRow>
      <CCol xl={12}>
        <CDataTable
          items={businessData}
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
              key: "승인",
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
                  <Badge
                    status={getBadge(Done[item.vacation_STATUS])}
                    text={Done[item.vacation_STATUS]}
                  ></Badge>
                </h4>
              </td>
            ),
            승인: (item) => (
              <td className="py-2" style={{ textAlign: "center" }}>
                <Button
                  active
                  type="primary"
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
                  승인
                </Button>
              </td>
            ),
            거절: (item) => (
              <td className="py-2" style={{ textAlign: "center" }}>
                <Button
                  active
                  type="danger"
                  onClick={async (e) => {
                    await UpdateVacationStatus(
                      2,
                      item.vacation_INDEX,
                      item.vacation_DATE,
                      item.vacation_ATTEND_INFO_INDEX,
                      item.vacation_EMP_INDEX
                    );
                    dispatch(vacationAxios());
                  }}
                  aria-pressed="true"
                  value={item.vacation_INDEX}
                  name={1}
                >
                  거절
                </Button>
              </td>
            ),
          }}
        />
      </CCol>
    </CRow>
  );
};

export default React.memo(BusinessManage);
