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
import { DeleteWorkRule } from "src/lib/api/manager/addOptions/addOptions";
import { workRuleAxios, workTypeAxios } from "src/modules/manager/addOptions";
import Modal from "./WorkRuleModal";
import InsertModal from "./WorkRuleInsertModal";

const Team = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(true);
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
  const [content, setContent] = useState({
    work_type_index: "",
    index: "",
    work_rule_name: "",
    starttime: "",
    endtime: "",
    work_rule_avg_time: "",
    breaktime: "",
  });
  const [details, setDetails] = useState([]);
  // const [items, setItems] = useState(usersData)

  const deptData = workrule.map((item) => {
    return {
      인덱스: item.work_RULE_INDEX,
      종류인덱스: item.work_TYPE_INDEX,
      종류: item.work_TYPE_NAME,
      이름: item.work_RULE_NAME,
      출근시간: item.work_RULE_START,
      퇴근시간: item.work_RULE_END,
      휴식시간: item.work_RULE_BREAK,
      평균근무시간: item.work_RULE_AVG_HOUR,
      팀COUNT: item.team_COUNT,
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

    { key: "출근시간", _style: { width: "10%" } },
    { key: "퇴근시간", _style: { width: "10%" } },
    { key: "휴식시간", _style: { width: "20%" } },
    { key: "평균근무시간", _style: { width: "10%" } },
    { key: "팀COUNT", _style: { width: "10%" } },

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
                  <CAlert
                    color="danger"
                    show={show["show"] && show["index"] === item.인덱스}
                    closeButton
                    name={item.인덱스}
                    onClick={() => {
                      setShow((content) => ({
                        ...content,
                        show: false,
                        index: item.인덱스,
                      }));
                    }}
                  >
                    근무유형을 선택한 팀이 있습니다.
                  </CAlert>
                  <Modal
                    visible={visible}
                    setVisible={setVisible}
                    index={item.인덱스}
                    dispatch={dispatch}
                    axios={workRuleAxios}
                    worktype={worktype}
                    work_TYPE_INDEX={item.종류인덱스}
                    work_rule_name={item.이름}
                    work_TYPE_NAME={item.종류}
                    출근시간={item.출근시간}
                    퇴근시간={item.퇴근시간}
                    휴식시간={item.휴식시간}
                    평균근무시간={item.평균근무시간}
                    setContent={setContent}
                    content={content}
                  />

                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      setVisible(!visible);
                      setContent({
                        work_type_index: item.종류인덱스,
                        index: item.인덱스,
                        work_rule_name: item.이름,
                        starttime: item.출근시간,
                        endtime: item.퇴근시간,
                        work_rule_avg_time: item.평균근무시간,
                        breaktime: item.휴식시간,
                      });
                    }}
                  >
                    유형수정
                  </CButton>

                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      if (item.팀COUNT === 0) {
                        DeleteWorkRule(item.인덱스);
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
        <InsertModal
          visible={visible2}
          setVisible={setVisible2}
          dispatch={dispatch}
          axios={workRuleAxios}
          worktype={worktype}
          doubleCheck={doubleCheck}
          setDoubleCheck={setDoubleCheck}
        />
        <CButton
          block
          variant="outline"
          color="primary"
          onClick={() => {
            setVisible2(!visible2);
            setDoubleCheck(true);
          }}
        >
          근무유형추가
        </CButton>
      </CCol>
    </>
  );
};
export default React.memo(Team);
