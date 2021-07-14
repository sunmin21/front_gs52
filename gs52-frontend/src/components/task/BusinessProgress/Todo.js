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
import { Badge, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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
const Todo = ({ content, pageCount, success, remove, reject, userid }) => {
  const history = useHistory();
  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");

  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  const pageChange = (newPage) => {
    currentPage !== newPage && history.push(`/task/schedule?page=${newPage}`);
  };
  const dispatch = useDispatch();
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
                      {item.todo_CONTENTS}
                    </td>
                  );
                },
                요청날짜: (item) => (
                  <td style={{ textAlign: "center" }}>
                    {item.todo_START_DATE}
                  </td>
                ),
                상태: (item) => (
                  <td>
                    <h4 style={{ textAlign: "center" }}>
                      <Badge
                        status={getBadge(Done[item.todo_DONE])}
                        text={Done[item.todo_DONE]}
                        block
                      ></Badge>
                    </h4>
                  </td>
                ),
                완료: (item) => (
                  <td>
                    <Button
                      block
                      type="primary"
                      onClick={async (e) => {
                        await success(e);
                        await dispatch(todoAxios(userid));
                        await dispatch(sendAxios(userid));
                        await dispatch(succssAxios(userid));
                      }}
                      value={item.todo_INDEX}
                      name={2}
                    >
                      완료
                    </Button>
                  </td>
                ),
                거절: (item) => (
                  <td>
                    <Button
                      block
                      type="primary"
                      onClick={async (e) => {
                        await reject(e);
                        await dispatch(todoAxios(userid));
                        await dispatch(sendAxios(userid));
                        await dispatch(succssAxios(userid));
                      }}
                      value={item.todo_INDEX}
                      name={1}
                      danger
                    >
                      거절
                    </Button>
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

export default Todo;
