import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTeam } from "src/lib/api/manager/addOptions/addOptions";
import { workRuleAxios, workTypeAxios } from "src/modules/manager/addOptions";
import Modal from "./WorkRuleModal";

const Team = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const dispatch = useDispatch();
  let { team } = useSelector(({ manager }) => ({
    team: manager.team,
  }));
  let { workrule, worktype } = useSelector(({ manager }) => ({
    workrule: manager.workrule,
    worktype: manager.worktype,
  }));
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  useEffect(() => {
    dispatch(workRuleAxios());
    dispatch(workTypeAxios());
  }, [dispatch]);

  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  const deptData = workrule.map((item) => {
    console.log(item);
    return {
      인덱스: item.work_RULE_INDEX,
      종류인덱스: item.work_TYPE_INDEX,
      종류: item.work_TYPE_NAME,
      이름: item.work_RULE_NAME,
      출근시간: item.work_RULE_START,
      휴식시간: item.work_RULE_BREAK,
      평균근무시간: item.work_RULE_AVG_HOUR,
    };
  });

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
    { key: "종류", _style: { width: "20%" } },
    { key: "이름", _style: { width: "20%" } },

    { key: "출근시간", _style: { width: "20%" } },
    { key: "휴식시간", _style: { width: "20%" } },
    { key: "평균근무시간", _style: { width: "20%" } },

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
                  <Modal
                    visible={visible}
                    setVisible={setVisible}
                    index={item.인덱스}
                    dispatch={dispatch}
                    axios={workRuleAxios}
                    worktype={worktype}
                    work_TYPE_INDEX={item.종류인덱스}
                    work_rule_name={item.이름}
                  />

                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      setVisible(!visible);
                    }}
                  >
                    유형수정
                  </CButton>

                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      if (item.팀원COUNT === 0) {
                        DeleteTeam(item.인덱스);
                        dispatch(workRuleAxios());
                      } else {
                        setShow((content) => ({
                          ...content,
                          show: true,
                          index: item.인덱스,
                        }));
                      }
                    }}
                  >
                    유형삭제
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        {/* <InsertModal
          visible={visible2}
          setVisible={setVisible2}
          dispatch={dispatch}
          axios={teamAxios}
        /> */}
        <CButton
          block
          variant="outline"
          color="primary"
          onClick={() => {
            setVisible2(!visible2);
          }}
        >
          팀추가
        </CButton>
      </CCol>
    </>
  );
};
export default React.memo(Team);
