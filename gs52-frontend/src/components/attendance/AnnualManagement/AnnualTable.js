import React, { useEffect, useState } from "react";
import { Home } from "../../../lib/api/test";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import { DocsLink } from "src/reusable";

import usersData from "../../../views/users/UsersData";
import axios from "axios";

const getBadge = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "secondary";
    case "Pending":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};

const annual = [
  "VACATION_DATE",
  "VACATION_ATTEND_INFO_INDEX",
  "VACATION_REASON",
  "남은 휴가",
];
const Tables = () => {
  const [inputData, setInputData] = useState([
    {
      VACATION_INDEX: "",
      VACATION_DATE: "",
      VACATION_ATTEND_INFO_INDEX: "",
      VACATION_REASON: "",
      VACATION_REMAIN: "",
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      var moment = require("moment");
      const res = await axios.post("/annual/a", { vacation_emp_id: 542321 });

      console.log(res);
      const _inputData = await res.data.map((rowData) => ({
        VACATION_INDEX: rowData.vacation_index,
        VACATION_DATE: moment(rowData.vacation_date).format("YYYY년 MM월 DD일"),
        VACATION_ATTEND_INFO_INDEX: rowData.vacation_attend_info_index,
        VACATION_REMAIN: rowData.vacation_remain,
        VACATION_REASON: rowData.vacation_reason,
      }));
      //inputData.concat(_inputData)
      setInputData(_inputData);
    } catch (e) {
      console.error(e.message);
    }
  }, []);
  console.log(inputData);
  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>연차 사용 정보</CCardHeader>
            <CCardBody>
              <CDataTable
                items={inputData}
                fields={annual}
                hover
                sorter
                striped
                bordered
                size="sm"
                itemsPerPage={10}
                pagination
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;
