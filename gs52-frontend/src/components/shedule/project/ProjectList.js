import React, { useState } from "react";
import {
  CCardBody,
  CDataTable,
  CBadge,
  CButton,
  CCollapse,
  CCard,
  CTabPane,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
const usersData = [
  {
    번호: 1,
    프로젝트명: "첫 번째 프로젝트 어쩌구 저쩌구",
    시작: "2021-03-01",
    종료: "2021-04-01",
    담당자: "Guest",
  },
  {
    번호: 2,
    프로젝트명: "이게 바로 두 번째 프로젝트다",
    시작: "2021-04-01",
    종료: "2021-05-01",
    담당자: "Member",
  },
  {
    번호: 3,
    프로젝트명: "리액트를 이용한 세 번째 프로젝트",
    시작: "2021-05-01",
    종료: "2021-06-01",
    담당자: "Staff",
  },
  {
    번호: 4,
    프로젝트명: "네 번째 프로젝트는 스프링 부트",
    시작: "2021-06-01",
    종료: "2021-07-01",
    담당자: "Admin",
  },
  {
    번호: 5,
    프로젝트명: "가장 최근에 생긴 다섯 번째 프로젝트",
    시작: "2021-07-01",
    종료: "2021-08-01",
    담당자: "Member",
  },
];

function ProjectList() {
  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)
  const history = useHistory();
  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "번호", _style: { width: "5%" } },
    { key: "프로젝트명", _style: { width: "50%" } },
    "시작",
    "종료",
    { key: "담당자", _style: { width: "20%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "7%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <CCardBody>
      <CDataTable
        items={usersData}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        sorterValue={{ column: "번호", desc: "true" }}
        pagination
        onRowClick={(item) => {
          history.push({
            pathname: `/schedule/project/detail`,
            state: item.번호,
          });
        }}
      />
    </CCardBody>
  );
}

export default ProjectList;
