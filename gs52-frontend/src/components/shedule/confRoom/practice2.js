import React, { useState } from "react";
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
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { InsertConf } from "../../../lib/api/conf/ConfAPI";

export function ConfModal() {

	const FLOOR_SELECT = ["5층", "6층"];
	const ROOM_SELECT = ["1호", "2호"];

	const [primary, setPrimary] = useState(false);
	const [floor, setFloor] = useState(FLOOR_SELECT[0]);
	const [room, setRoom] = useState(ROOM_SELECT[0]);


    //data 여러값 하나의 변수로 관리하기.
    //초기값 세팅
  const [insertData, setInsertData] = useState({
    floor: '',
    room: ''
  });

  //호출되면 기존 변수값 넣어주기
  const onReset = () => {
    setInsertData({
      floor: floor,
      room: room,
    })
  };

    //이벤트 
	const handleFloor = e =>{
		setFloor(e.target.value);
	};	
	const handleRoom = e =>{
		setRoom(e.target.value);
	};



  const click = () => {
    InsertConf(floor, room);
    setPrimary(!primary);
    onReset();
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
