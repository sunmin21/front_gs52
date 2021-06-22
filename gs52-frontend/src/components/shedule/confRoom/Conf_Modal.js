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
  CInputGroup
} from "@coreui/react";
import { InsertConf,SelectConf } from "../../../lib/api/conf/ConfAPI";
import 'antd/dist/antd.css';
import { TimePicker, DatePicker } from 'antd';
import moment from 'moment';


export function ConfModal(props) {

	const FLOOR_SELECT = ["5", "6"];
	const ROOM_SELECT = ["1", "2"];
	const _SELECT = ["1", "2"];

	const [primary, setPrimary] = useState(false);
  
  const [title, setTitle] = useState();
	const [floor, setFloor] = useState(FLOOR_SELECT[0]);
	const [room, setRoom] = useState(ROOM_SELECT[0]);
  
  const dateFormat = 'YYYY/MM/DD';
  

	const handleFloor = e =>{
		setFloor(e.target.value);
	};	
	const handleRoom = e =>{
		setRoom(e.target.value);
	};

  const click = () => {
    InsertConf(floor, room, title);
    setPrimary(!primary);
  };

  const onChange = (e) => {
    // 이벤트가 발생한 DOM의 값 가져오기
    //console.log(e.target.value);
   setTitle(e.target.value);
}



  useEffect(() => {
     console.log('props.click 값이 설정됨');       //2021-06-22T07:00:00+09:00
    // console.log("modal click  "+props.click);
    // console.log("modal time  "+props.time);
    // setDate(moment(props.time).format(dateFormat));
    // setTime(moment(props.time).format('hh:mm'));
    return () => {
       console.log('props.click 가 바뀌기 전..');
      // console.log("modal click  "+props.click);
      // console.log("modal time  "+props.time);
      setPrimary(!primary)
    };
  }, [props.click]);


  const onClick = e => {
		props.setEmp_click(true);
  };
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+props.time)
// console.log("1970/01/01" ===props.time )
if("1970/01/01" !==props.time){
  return (
    <div>            
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
          
          <CInput id="title" name="title" placeholder="제목을 입력하세요." onChange={onChange}/>

          <CFormGroup row>
            
            <CCol md="3">
              
              <CFormGroup>
                <CSelect onChange={handleFloor}>
                  {FLOOR_SELECT.map((floor, idx) => {
                    return (
                      <option key={idx} value={floor} >
                        {floor}층
                      </option>
                    );
                  })}
                </CSelect>


              </CFormGroup>
            </CCol>
            <CCol md="3">
              <CFormGroup>
                <CSelect onChange={handleRoom}>
                  {ROOM_SELECT.map((room, idx) => {
                    return (
                      <option key={idx} value={room}>
                        {room}호
                      </option>
                    );
                  })}
                </CSelect>
              </CFormGroup>
            </CCol>

            <CCol md="9">
            
            
            <DatePicker defaultValue={moment(props.time, dateFormat)} format={dateFormat} />
            {console.log("moment(date, dateFormat)   " + props.time)}
            <TimePicker.RangePicker />
            </CCol>

            <CCol md="5">일정초대</CCol>
            <CCol md="5">
              <div className="controls">
                <CInputGroup className="input-prepend">
                  <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput id="prependedInput" size="16" type="text" onClick={onClick}/>
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
          <CButton color="secondary" onClick={() => {setPrimary(!primary)}}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}
else{
  return<></>
}

}



export default ConfModal;
