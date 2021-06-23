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
import { useHistory, useLocation } from "react-router-dom";
import Modal from "./TodoBoardModal";
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
const Send = ({ content, pageCount, setSendContents }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/task/schedule?page=${newPage}`);
  };
  // const [info, setInfo] = useState(false);
  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);
  const Done = {
    0: "대기중",
    1: "거절",
    2: "완료",
  };

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <div>
              send!!
              <CButton
                active
                block
                color="dark"
                aria-pressed="true"
                style={{ textAlign: "center", width: "10%", float: "right" }}
                onClick={() => {
                  history.push("/task/schedule/create");
                }}
              >
                요청하기
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* <Modal info={info} setInfo={setInfo}></Modal> */}
            <CDataTable
              items={content}
              fields={[
                { key: "받은사람", _classes: "font-weight-bold" },
                { key: "내용", _style: { width: "70%", textAlign: "center" } },
                {
                  key: "보낸날짜",
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
              activePage={page}
              clickableRows
              // onRowClick={(item) =>
              //   history.push(`/task/schedule/SendContent/${item.id}`)
              // }
              scopedSlots={{
                받은사람: (item) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      // onClick={() =>
                      //   // history.push(`/task/schedule/SendContent/${item.id}`)
                      //   // setInfo(!info)

                      // }
                    >
                      {item.emp_NAME}
                    </td>
                  );
                },
                내용: (item) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      // onClick={() =>
                      //   // history.push(`/task/schedule/SendContent/${item.id}`)
                      //   // setInfo(!info)

                      // }
                    >
                      {item.todo_CONTENTS}
                    </td>
                  );
                },
                보낸날짜: (item) => (
                  <td style={{ textAlign: "center" }}>
                    {item.todo_START_DATE}
                  </td>
                ),
                상태: (item) => (
                  <td>
                    <h4 style={{ textAlign: "center" }}>
                      <CBadge color={getBadge(Done[item.todo_DONE])}>
                        {Done[item.todo_DONE]}
                      </CBadge>
                    </h4>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={content.length / 10 + 1}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Send;
