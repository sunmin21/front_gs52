import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CCollapse,
  CDataTable,
} from "@coreui/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTeam } from "src/lib/api/manager/addOptions/addOptions";
import { confRoomAxios } from "src/modules/manager/addOptions";
import Modal from "./TeamModal";
import InsertModal from "./TeamInsertModal";
const ConfRoom = () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const dispatch = useDispatch();
  let { confroom } = useSelector(({ manager }) => ({
    confroom: manager.confroom,
  }));
  let { workrule } = useSelector(({ manager }) => ({
    workrule: manager.workrule,
  }));
  const [show, setShow] = useState({
    show: false,
    index: 0,
  });
  useEffect(() => {
    dispatch(confRoomAxios());
  }, [dispatch]);
  const [content, setContent] = useState({
    teamname: "",
    work_RULE_INDEX: "",
    index: "",
  });
  const [details, setDetails] = useState([]);

  const deptData = useCallback(
    () =>
      confroom.map((item) => {
        console.log(item);
        return {
          인덱스: item.conf_ROOM_FLOOR,
          층: item.conf_ROOM_INDEX,
          호수: item.conf_ROOM_NUMBER,
          예약COUNT: item.conf_ROOM_COUNT,
        };
      }),
    [confroom]
  );

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
    { key: "층", _style: { width: "20%" } },
    { key: "호수", _style: { width: "40%" } },
    { key: "예약COUNT", _style: { width: "40%" } },

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
        items={deptData()}
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
                  {workrule.length !== 0 && (
                    <Modal
                      visible={visible}
                      setVisible={setVisible}
                      index={item.인덱스}
                      dispatch={dispatch}
                      axios={confRoomAxios}
                      workrule={workrule}
                      work_RULE_INDEX={item.work_RULE_INDEX}
                      teamName={item.팀이름}
                      setContent={setContent}
                      content={content}
                    />
                  )}

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
                    팀안에 팀원이 존재 합니다.
                  </CAlert>
                  <CButton
                    size="sm"
                    color="info"
                    onClick={() => {
                      setVisible(!visible);
                      setContent({
                        teamname: item.팀이름,
                        work_RULE_INDEX: item.work_RULE_INDEX,
                        index: item.인덱스,
                      });
                    }}
                  >
                    팀수정
                  </CButton>

                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => {
                      if (item.팀원COUNT === 0) {
                        DeleteTeam(item.인덱스);
                        dispatch(confRoomAxios());
                      } else {
                        setShow((content) => ({
                          ...content,
                          show: true,
                          index: item.인덱스,
                        }));
                      }
                    }}
                  >
                    팀삭제
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
      <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
        {/* {workrule.length !== 0 && (
          <InsertModal
            visible={visible2}
            setVisible={setVisible2}
            dispatch={dispatch}
            axios={confRoomAxios}
            workrule={workrule}
          />
        )} */}
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
export default ConfRoom;
