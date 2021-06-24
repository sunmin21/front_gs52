import { CButton, CCardBody, CCollapse, CDataTable } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { DeleteDept } from "src/lib/api/manager/addOptions/addOptions";
import { deptAxios } from "src/modules/manager/manager";
import usersData from "src/views/users/UsersData";

const Dept = () => {
  const dispatch = useDispatch();
  let { dept } = useSelector(({ manager }) => ({
    dept: manager.dept,
  }));

  useEffect(() => {
    dispatch(deptAxios());
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  console.log(dept);
  const deptData = dept.map((item) => ({
    인덱스: item.dept_INDEX,
    부서이름: item.dept_NAME,
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

  const fields = [
    { key: "인덱스", _style: { width: "20%" } },
    { key: "부서이름", _style: { width: "40%" } },

    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
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
                <CButton size="sm" color="info" onClick={() => {}}>
                  부서수정
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() => {
                    DeleteDept(item.인덱스);
                    dispatch(deptAxios());
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
  );
};
export default Dept;