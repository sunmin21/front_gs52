import React, { useEffect, useState } from "react";
import { CCardBody, CDataTable } from "@coreui/react";
import { useHistory } from "react-router-dom";
import { proceedingAxios } from "src/modules/schedule/project/projectList";
import { projectNoChange } from "src/modules/schedule/project/project";
import moment from "moment";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

function Proceeding({ dispatch, proceeding }) {
  const user = getCurrentUser();
  let [emp] = useState(user.index);

  const history = useHistory();

  useEffect(() => {
    dispatch(proceedingAxios(emp));
  }, [dispatch]);

  const date = moment().format("YYYY-MM-DD");

  const data = proceeding
    .filter((item) => item.project_START <= date && item.project_END >= date)
    .map((item, key) => ({
      번호: key + 1, // index를 1부터 세 주기 위해서
      프로젝트명: item.project_TITLE,
      시작: item.project_START,
      종료: item.project_END,
      담당자: item.emp_NAME,
      인덱스: item.project_INDEX,
    }));

  return (
    <CCardBody>
      <CDataTable
        items={data}
        fields={[
          { key: "번호", _style: { width: "10%" } },
          { key: "프로젝트명", _style: { width: "45%" } },
          "시작",
          "종료",
          { key: "담당자", _style: { width: "15%" } },
        ]}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        sorterValue={{ column: "번호", asc: "true" }}
        pagination
        onRowClick={(item) => {
          history.push({
            pathname: `/schedule/project/detail`,
          });
          dispatch(projectNoChange({ index: item.인덱스 }));
        }}
      />
    </CCardBody>
  );
}

export default Proceeding;
