import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CSelect,
  CCol,
  CInput,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup,
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { InsertConf } from "../../../lib/api/ConfAPI";

export function ConfModal(props) {

	const FLOOR_SELECT = ["5층", "6층"];
	const ROOM_SELECT = ["1호", "2호"];

	const [primary, setPrimary] = useState(false);
	const [floor, setFloor] = useState();
	const [room, setRoom] = useState(false);

  const [insertData, setInsertData] = useState({
    floor: '',
    room: ''
  });

  const onReset = () => {
    setInsertData({
      floor: floor,
      room: room,
    })
  };


	const handleFloor = e =>{
		setFloor(e.target.value);
	};	
	const handleRoom = e =>{
		setRoom(e.target.value);
	};



  const click = () => {
    InsertConf(floor);
    setPrimary(!primary);
    props.setFloor(floor);
    props.setRoom(room);
    onReset();
    console.log("floor" + floor);
    console.log("room" + room);
    console.log("가나다라마");
    console.log(insertData);
  };

  return (
    <div>

      <h2>회의실 예약</h2>
      <br />
      <CButton color="primary"
        onClick={() => setPrimary(!primary)}
      >
        추가
      </CButton>

      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>회의실 예약</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h4>회의실 예약</h4>
          
          <CInput id="title" name="title" placeholder="제목을 입력하세요." />

          <CFormGroup row>
            
            <CCol md="3">
              
              <CFormGroup>
               <CSelect value={floor} onChange={handleFloor}>
                  {FLOOR_SELECT.map((floor, idx) => {
                    return (
                      <option key={idx} value={floor} >
                        {floor}
                      </option>
                    );
                  })}
                </CSelect>


              </CFormGroup>
            </CCol>
            <CCol md="3">
              <CFormGroup>
                <CSelect value={room} onChange={handleRoom}>
                  {ROOM_SELECT.map((room, idx) => {
                    return (
                      <option key={idx} value={room}>
                        {room}
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>

            <CCol md="9">
              <CInput
                type="date"
                id="date-input"
                name="date-input"
                placeholder="date"
              />
            </CCol>
          </CFormGroup>

          <br />

          <h5>상세설정</h5>

          <CFormGroup row>
            <CCol md="5">사용시간대</CCol>
            <CCol md="3">
              <CFormGroup>
                <CLabel htmlFor="time"></CLabel>
                <CSelect custom name="time" id="time">
                  <option value="1">1호</option>
                  <option value="2">2호</option>
                </CSelect>
              </CFormGroup>
            </CCol>

            <CCol md="5">일정초대</CCol>
            <CCol md="5">
              <div className="controls">
                <CInputGroup className="input-prepend">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput id="prependedInput" size="16" type="text" />
                </CInputGroup>
                <p className="help-block">초대 인원 선택하세요</p>
              </div>
            </CCol>
          </CFormGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={click}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setPrimary(!primary)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default ConfModal;
