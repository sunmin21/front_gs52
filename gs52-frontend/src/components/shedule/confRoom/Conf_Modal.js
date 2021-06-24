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

import { useDispatch, useSelector } from 'react-redux';
import { modalCheck1,modalDate, modalTime } from 'src/modules/schedule/conf';

export function ConfModal() {
  const [check, setCheck]  = useState(0);
	const FLOOR_SELECT = ["5", "6"];
	const ROOM_SELECT = ["1", "2"];
	const _SELECT = ["1", "2"];

const [primary, setPrimary] = useState(false);
  
const dateFormat = 'YYYY-MM-DD';

const [inputs, setInputs] = useState({
  title:null,
  floor:FLOOR_SELECT[0],
  room:ROOM_SELECT[0],
  })
const {title, floor, room} = inputs;

const [date, setDate] = useState(moment().format(dateFormat));
const [time, setTime] = useState();

const onChange = (e) => {
  //input에 name을 가진 요소의 value에 이벤트를 걸었다
  const { name, value } = e.target   

  // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
  const nextInputs = {            
  //스프레드 문법으로 기존의 객체를 복사한다.
      ...inputs,  
      [name]: value,
    }
  //만든 변수를 seInput으로 변경해준다.
    setInputs(nextInputs)      
}

function onDate(date, dateString) {
  setDate(dateString)
}
function onTime(timeString) {
  setTime(timeString)
}


const onClick = e => {

};

const dispatch = useDispatch();
const { conf_modal1, conf_date, conf_time } = useSelector((state) => {
  
  console.log("state.conf_check.conf_modal1      "+state.conf_check.conf_modal1)
    return ({   
      conf_modal1: state.conf_check.conf_modal1,
			conf_date: state.conf_check.conf_date,
			conf_time: state.conf_check.conf_time
    })
});


  const onRegist = () => {
    InsertConf(inputs.floor, inputs.room, inputs.title, date, time);
    dispatch(modalCheck1())
  };
  const onCancle = e => {
    dispatch(modalCheck1())
  }


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
          
          <CInput id="title" name="title" placeholder="제목을 입력하세요." onChange={onChange}/>

          <CFormGroup row>
            
            <CCol md="3">
              
              <CFormGroup>
                <CSelect id="floor" name="floor" onChange={onChange}>
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
                <CSelect id="room" name="room" onChange={onChange}>
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
		{console.log("123123123123")}
		{console.log(conf_time)}
            <DatePicker onChange={onDate} defaultValue={moment(conf_date, dateFormat)}/>
            <TimePicker.RangePicker onChange={onTime} defaultValue = {[moment(conf_time, 'HH:mm'),moment(conf_time, 'HH:mm')]} format="HH:mm" minuteStep={10}/>
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
