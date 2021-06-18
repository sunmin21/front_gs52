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
import usersData from "./UsersData";

const getBadge = (status) => {
  switch (status) {
    case "수락":
      return "success";
    case "Inactive":
      return "secondary";
    case "대기중":
      return "warning";
    case "Banned":
      return "danger";
    default:
      return "primary";
  }
};
const Todo = ({ content, pageCount, success, remove, reject }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/task/schedule?page=${newPage}`);
  };

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            TODO!
            <small className="text-muted"> </small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={content}
              fields={[
                { key: "보낸사람", _classes: "font-weight-bold" },
                { key: "내용", _style: { width: "50%", textAlign: "center" } },
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
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              // onRowClick={(item) =>
              //   history.push(`/task/schedule/SendContent/${item.id}`)
              // }
              scopedSlots={{
                내용: (item) => (
                  <td
                    style={{ textAlign: "center" }}
                    onClick={() =>
                      history.push(`/task/schedule/SendContent/${item.id}`)
                    }
                  >
                    {item.내용}
                  </td>
                ),
                요청날짜: (item) => (
                  <td style={{ textAlign: "center" }}>{item.요청날짜}</td>
                ),
                상태: (item) => (
                  <td>
                    <h4 style={{ textAlign: "center" }}>
                      <CBadge color={getBadge(item.상태)}>{item.상태}</CBadge>
                    </h4>
                  </td>
                ),
                완료: (item) => (
                  <td>
                    <CButton
                      active
                      block
                      color="success"
                      onClick={(e) => {
                        success(e);
                        remove(e);
                      }}
                      aria-pressed="true"
                      value={item.id}
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
                      onClick={(e) => {
                        reject(e);
                        remove(e);
                      }}
                      aria-pressed="true"
                      value={item.id}
                      name={1}
                    >
                      거절
                    </CButton>
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={pageCount}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Todo;
