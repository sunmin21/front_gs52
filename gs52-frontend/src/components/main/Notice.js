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

const Notice = ({ content, pageCount, setSendContents }) => {
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
  const data = content.map((item) => ({
    인덱스: item.notice_INDEX,
    제목: item.notice_TITLE,
    내용: item.notice_CONTENTS,
    작성자INDEX: item.notice_INDEX,
    작성자: item.emp_NAME,
    등록날짜: item.notice_DATE,
  }));
  console.log(data);
  return (
    <>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            <div>
              공지사항
              <CButton
                active
                block
                color="dark"
                aria-pressed="true"
                style={{ textAlign: "center", width: "10%", float: "right" }}
                onClick={() => {
                  history.push("/notice/create");
                }}
              >
                등록하기
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* <Modal info={info} setInfo={setInfo}></Modal> */}
            <CDataTable
              items={data}
              fields={[
                {
                  key: "번호",
                  _classes: "font-weight-bold",
                  _style: { width: "10%", textAlign: "center" },
                },
                {
                  key: "제목",
                  _classes: "font-weight-bold",
                  _style: { width: "60%", textAlign: "center" },
                },
                {
                  key: "등록날짜",
                  _style: { width: "15%", textAlign: "center" },
                },
                {
                  key: "작성자",
                  _style: { width: "15%", textAlign: "center" },
                },
              ]}
              hover
              striped
              itemsPerPage={10}
              activePage={page}
              clickableRows
              onRowClick={(item) =>
                history.push(`/notice/detail/${item.인덱스}`)
              }
              scopedSlots={{
                번호: (item) => {
                  return <td style={{ textAlign: "center" }}>{item.인덱스}</td>;
                },
                제목: (item) => {
                  return (
                    <td
                      style={{ textAlign: "center" }}
                      // onClick={() =>
                      //   // history.push(`/task/schedule/SendContent/${item.id}`)
                      //   // setInfo(!info)

                      // }
                    >
                      {item.제목}
                    </td>
                  );
                },
                등록날짜: (item) => (
                  <td style={{ textAlign: "center" }}>{item.등록날짜}</td>
                ),
                작성자: (item) => (
                  <td style={{ textAlign: "center" }}>{item.작성자}</td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={data.length / 10 + 1}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </>
  );
};

export default Notice;
