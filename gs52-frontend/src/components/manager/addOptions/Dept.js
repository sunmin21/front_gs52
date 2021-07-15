import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteDept } from "src/lib/api/manager/addOptions/addOptions";
import { deptAxios } from "src/modules/manager/addOptions";
import Modal from "./DeptModal";
import InsertModal from "./DeptInsertModal";

const Dept = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(true);

  const dispatch = useDispatch();
  let { dept } = useSelector(({ manager }) => ({
    dept: manager.dept,
  }));
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  useEffect(() => {
    dispatch(deptAxios());
  }, [dispatch]);
  const [content, setContent] = useState();
  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  const deptData = dept.map((item) => ({
    인덱스: item.dept_INDEX,
    부서이름: item.dept_NAME,
    팀COUNT: item.team_COUNT,
  }));
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
  console.log(dept);
  const fields = [
    { key: "인덱스", _style: { width: "20%" } },
    { key: "부서이름", _style: { width: "40%" } },
    { key: "팀COUNT", _style: { width: "40%" } },

    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <>
      <CDataTable
        items={deptData}
        fields={fields}
        columnFilter
        tableFilter
        footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  {deptData.length !== 0 && (
                    <Modal
                      visible={visible}
                      setVisible={setVisible}
                      index={item.인덱스}
                      dispatch={dispatch}
                      axios={deptAxios}
                      부서이름={item.부서이름}
                      setContent={setContent}
                      content={content}
                    />
                  )}
                  <CAlert
                    color="danger"
                    show={show["show"] && show["index"] === item.인덱스}
                    closeButton
                    onClick={() => {
                      setShow((content) => ({
                        ...content,
                        show: false,
                        index: item.인덱스,
                      }));
                    }}
                  >
                    부서 안에 팀이 존재합니다.
                  </CAlert>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={async () => {
                      setVisible(!visible);
                      setContent(item.부서이름 || "");
                    }}
                  >
                    부서수정
                  </CButton>

                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={async () => {
                      if (item.팀COUNT === 0) {
                        await DeleteDept(item.인덱스);
                        await dispatch(deptAxios());
                      } else {
                        setShow((content) => ({
                          ...content,
                          show: true,
                          index: item.인덱스,
                        }));
                      }
                    }}
                  >
                    부서삭제
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        {deptData.length !== 0 && (
          <InsertModal
            visible={visible2}
            setVisible={setVisible2}
            dispatch={dispatch}
            axios={deptAxios}
            doubleCheck={doubleCheck}
            setDoubleCheck={setDoubleCheck}
          />
        )}
        <CButton
          block
          variant="outline"
          color="primary"
          onClick={() => {
            setVisible2(!visible2);
            setDoubleCheck(true);
          }}
        >
          부서추가
        </CButton>
      </CCol>
    </>
  );
};
export default Dept;
