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
  CAlert,
} from "@coreui/react";
import {
  InsertConf,
  SelectConf,
  Select_emp,
} from "../../../lib/api/conf/ConfAPI";
import "antd/dist/antd.css";
import { TimePicker, DatePicker } from "antd";
import moment from "moment";

import Dropdown from "./Conf_EmpDropdown";


import { useDispatch, useSelector } from "react-redux";
import {
  FloorAxios,
  RoomAxios,
  modalCheck1,
  modalCheck2,
  modalDate,
  modalStartTime,
  modalEndTime,
} from "src/modules/schedule/conf";

export function ConfModal() {
  const dispatch = useDispatch();
  const { floor_list, room_list, conf_modal1, conf_date, conf_startTime, conf_endTime } =
    useSelector((state) => {
      console.log(state);
      return {
        floor_list: state.conf_check.floor_list,
        room_list: state.conf_check.room_list,
        conf_modal1: state.conf_check.conf_modal1,
        conf_date: state.conf_check.conf_date,
        conf_startTime: state.conf_check.conf_startTime,
        conf_endTime: state.conf_check.conf_endTime,
      };
    });

  useEffect(() => {
    dispatch(RoomAxios(floor_list[0].conf_ROOM_FLOOR));
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

  
  console.log("room_data");
  console.log(floor_data[0]);
  console.log(room_data[0]);

  const dateFormat = "YYYY-MM-DD";

  const [inputs, setInputs] = useState({
    title: null,
    floor:floor_data[0].conf_ROOM_FLOOR,
	//room:null,
  });
  const { title, floor, room} = inputs;

  const onChange = (e) => {
	if(e.target.id === 'floor'){
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
    dispatch(modalDate(moment(dateString).format("YYYY/MM/DD")));
    //setDate(dateString)
  }
  function onTime(timeString) {
    dispatch(modalStartTime(moment(timeString[0]).format("hh:mm")));
    dispatch(modalEndTime(moment(timeString[1]).format("hh:mm")));
    console.log(moment(timeString[0]).format("hh:mm"));
    console.log(moment(timeString[1]).format("hh:mm"));
    console.log(timeString);
    //setTime(timeString)
  }

  //유저 추가 텍스트필드 클릭 이벤트 함수
  const onClick = (e) => {
    dispatch(modalCheck2());
  };

  //등록 버튼 클릭 이벤트 함수
  const onRegist = () => {
    if (inputs.title === null) {
      {
        console.log("warning");
      }
      return (
        <CAlert color="warning">This is a warning alert — check it out!</CAlert>
      );
    } else {
      //roomIndex, title, date, startTime, endTime
	  console.log("Registtttttttttttttt")
	  console.log(room_data)
	  console.log(inputs)
      InsertConf(room_data[inputs.room].conf_ROOM_INDEX, inputs.title, conf_date, conf_startTime, conf_endTime);
      dispatch(modalCheck1());
    }
  };
  const onCancle = (e) => {
    dispatch(modalCheck1());
  };

  return (
    <div>
      <CModal
        show={conf_modal1}
        closeOnBackdrop={false}
        onClose={() => dispatch(modalCheck1())}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>회의실 예약</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <h4>회의실 예약</h4>



			<CInput
				id="title"
				name="title"
				placeholder="제목을 입력하세요."
				onChange={onChange}
			/>
				
				<CSelect id="floor" name="floor" onChange={onChange}>
					{floor_data.map((floor, idx) => {
					return (
						<option key={idx} value={floor.conf_ROOM_FLOOR}>
						{floor.conf_ROOM_FLOOR}층
						</option>
					);
					})}
				</CSelect>
				
			 <CSelect id="room" name="room" onChange={onChange}>
					{room_data.map((room, idx) => {
					return (
						<option key={idx} value={idx}>
						{room.conf_ROOM_NUMBER}호
						</option>
					);
					})}
				</CSelect>
				<DatePicker
				onChange={onDate}
				defaultValue={moment(conf_date, dateFormat)}
				/>
				<TimePicker.RangePicker
				onChange={onTime}
				defaultValue={[
					moment(conf_startTime, "HH:mm"),
					moment(conf_endTime, "HH:mm"),
				]}
				format="HH:mm"
				minuteStep={10}
				/>

				<div className="controls">
					<Dropdown></Dropdown>

				<p className="help-block">초대 인원 선택하세요</p>
				</div>

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
