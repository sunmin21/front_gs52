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

export function ConfButton(){
  
}

export function ConfModal(props) {

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

  // useEffect(() => {
  //   // console.log('props.conf_click 값이 설정됨');       //2021-06-22T07:00:00+09:00
  //     console.log(primary);
  //   return () => {
  //     //console.log('props.conf_click 가 바뀌기 전..');
  //     setPrimary(!primary)
  //     console.log(primary);
  //   };
  // }, [props.conf_click]);


  const onClick = e => {
		props.setEmp_click(true);
  };

  const onRegist = () => {
    console.log(date)
    InsertConf(inputs.floor, inputs.room, inputs.title, date, time);
    //props.setConf_Click(false);
  };
  const onCancle = e => {
    setPrimary(!primary)
    //props.setConf_Click(false);
  }


console.log("@@@@@@@@@@@@@@@@@@@@@@@@@")
// console.log("1970/01/01" ===props.time )
//if("1970/01/01" !==props.time){
  return (
    <div>            
      <CButton color="primary"
        onClick={() => setPrimary(!primary)}
      >
        추가
      </CButton>

      <CModal
        show={primary}
        closeOnBackdrop={false}
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
            
            
            <DatePicker onChange={onDate} defaultValue={moment()} />
            {/* <DatePicker defaultValue={moment(props.time, dateFormat)} format={dateFormat} /> */}
            {/* {console.log("moment(date, dateFormat)   " + props.time)} */}
            <TimePicker.RangePicker onChange={onTime} defaultValue = {[moment('09:00', 'HH:mm'),moment('09:30', 'HH:mm')]} format="HH:mm" minuteStep={10}/>
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
// }
// else{
//   return<></>
// }

}



export default ConfModal;
