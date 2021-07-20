import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CSelect,
  CCol,
  CInput,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
  CLabel,
  CAlert,
} from "@coreui/react";
import {
  InsertConf,
  overlap_Conf,
  SelectConf,
  Select_emp,
} from "../../../lib/api/conf/ConfAPI";
import "antd/dist/antd.css";
import { TimePicker, DatePicker } from "antd";
import moment from "moment";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

import MemberDropdown from "./../../../components/attendance/MemberSchedule/MemberDropdown";

import { useDispatch, useSelector } from "react-redux";

import {
  attendAxios,
  empAxios,
  teamAxios,
} from "src/modules/annual/memberSchedule";

import {
  ConfAxios,
  FloorAxios,
  RoomAxios,
  modalCheck1,
  modalCheck2,
  modalDate,
  modalStartTime,
  modalEndTime,
} from "src/modules/schedule/conf";

export function ConfModal() {
  const user = getCurrentUser();
  const dispatch = useDispatch();
  const {
    floor_list,
    room_list,
    conf_modal1,
    conf_date,
    conf_startTime,
    conf_endTime,
  } = useSelector((state) => {
    return {
      floor_list: state.conf_check.floor_list,
      room_list: state.conf_check.room_list,
      conf_modal1: state.conf_check.conf_modal1,
      conf_date: state.conf_check.conf_date,
      conf_startTime: state.conf_check.conf_startTime,
      conf_endTime: state.conf_check.conf_endTime,
    };
  });

  //리덕스에서 team 가져옴
  const { team, emp, treevalue } = useSelector((state) => {
    return {
      team: state.memberSchedule.team,
      emp: state.memberSchedule.emp,
      treevalue: state.memberSchedule.treevalue,
    };
  });

  useEffect(async () => {
    await dispatch(RoomAxios(floor_list[0].conf_ROOM_FLOOR));
    await dispatch(teamAxios());
    await dispatch(empAxios());
    await dispatch(attendAxios());
    await dispatch(ConfAxios());
  }, [dispatch]);

  const floor_data = floor_list.map((item) => ({
    conf_ROOM_INDEX: item.conf_ROOM_INDEX,
    conf_ROOM_FLOOR: item.conf_ROOM_FLOOR,
    conf_ROOM_NUMBER: item.conf_ROOM_NUMBER,
  }));

  const room_data = room_list.map((item) => ({
    conf_ROOM_INDEX: item.conf_ROOM_INDEX,
    conf_ROOM_FLOOR: item.conf_ROOM_FLOOR,
    conf_ROOM_NUMBER: item.conf_ROOM_NUMBER,
  }));

  const data = team.map((item) => ({
    title: item.dept_NAME + " : " + item.team_NAME,
    value: String(item.team_INDEX),
    key: String(item.team_INDEX),
    children: emp
      .filter((data) => data.emp_TEAM_INDEX === item.team_INDEX)
      .map((data) => ({
        title: data.emp_NAME,
        value: data.emp_ID,
        key: data.emp_ID,
        team: String(data.emp_TEAM_INDEX),
      })),
  }));

  const dateFormat = "YYYY-MM-DD";

  const [inputs, setInputs] = useState({
    title: null,
    floor: floor_data[0].conf_ROOM_FLOOR,
    room: floor_data[0].conf_ROOM_NUMBER,
  });
  const { title, floor, room } = inputs;

  const onChange = (e) => {
    if (e.target.id === "floor") {
      dispatch(RoomAxios(e.target.value));
    }
    //input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target;

    // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = {
      //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,
      [name]: value,
    };
    //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs);
  };

  //date picker, time picker 클릭 이벤트 함수
  function onDate(date, dateString) {
    dispatch(modalDate(moment(dateString).format("YYYY-MM-DD")));
    //setDate(dateString)
  }
  function onTime(timeString) {
    dispatch(modalStartTime(moment(timeString[0]).format("HH:mm")));
    dispatch(modalEndTime(moment(timeString[1]).format("HH:mm")));
  }

  //유저 추가 텍스트필드 클릭 이벤트 함수
  const onClick = (e) => {
    dispatch(modalCheck2());
  };

  //등록 버튼 클릭 이벤트 함수
  const onRegist = async () => {
    if (inputs.title === null) {
      {
        alert("제목 입력하십시오");
      }
      return (
        <CAlert color="warning">This is a warning alert — check it out!</CAlert>
      );
    } else {
      //roomIndex, title, date, startTime, endTime
      await overlap_Conf(room_data[inputs.room].conf_ROOM_INDEX,conf_date,conf_startTime,conf_endTime ).then((item)=>{
        console.log(item)
        if(item.data[0]==null){
          InsertConf(
            user.index,
            room_data[inputs.room].conf_ROOM_INDEX,
            inputs.title,
            conf_date,
            conf_startTime,
            conf_endTime,
            empList
          );
        }
        else{
          alert("이미 예약되어 있습니다.")
        }
      }
      );

      await dispatch(modalCheck1());
      await dispatch(ConfAxios());
    }
  };
  const onCancle = (e) => {
    dispatch(modalCheck1());
  };

  const empList = emp
    .filter(
      (item) =>
        treevalue.includes(String(item.emp_TEAM_INDEX)) ||
        treevalue.includes(item.emp_ID)
    )
    .map((item) => ({
      id: item.emp_INDEX,
    }));

  return (
    <div>
      <CModal
        show={conf_modal1}
        closeOnBackdrop={false}
        onClose={() => dispatch(modalCheck1())}
        color="secondary"
      >
        <CModalHeader closeButton>
          <CModalTitle>회의실 예약</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <h4>회의실 예약</h4>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="first_pwd">회의실 제목</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CInput
                id="title"
                name="title"
                placeholder="제목을 입력하세요."
                onChange={onChange}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="first_pwd"></CLabel>
            </CCol>
            <CCol xs="12" md="4">
              <CSelect id="floor" name="floor" onChange={onChange}>
                {floor_data.map((floor, idx) => {
                  return (
                    <option
                      key={idx}
                      value={floor.conf_ROOM_FLOOR}
                      defaultValue={floor.conf_ROOM_FLOOR[0]}
                    >
                      {floor.conf_ROOM_FLOOR}층
                    </option>
                  );
                })}
              </CSelect>
            </CCol>

            <CCol md="4">
              <CSelect id="room" name="room" onChange={onChange}>
                {room_data.map((room, idx) => {
                  return (
                    <option
                      key={idx}
                      value={idx}
                      defaultValue={room.conf_ROOM_INDEX}
                    >
                      {room.conf_ROOM_NUMBER}호
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="first_pwd">예약 시간</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <DatePicker
                onChange={onDate}
                defaultValue={moment(conf_date, dateFormat)}
              />
              <p></p>
              <TimePicker.RangePicker
                onChange={onTime}
                defaultValue={[
                  moment(conf_startTime, "HH:mm"),
                  moment(conf_endTime, "HH:mm"),
                ]}
                format="HH:mm"
                minuteStep={10}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="first_pwd">초대 인원</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <div className="controls">
                <MemberDropdown data={data}></MemberDropdown>
              </div>
            </CCol>
          </CFormGroup>
        </CModalBody>

        <CModalFooter>
          <CButton color="primary" onClick={onRegist}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={onCancle}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default ConfModal;
