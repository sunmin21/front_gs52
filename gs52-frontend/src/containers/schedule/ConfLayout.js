import React,{useState} from "react";
import {ConfRoom} from "../../components/shedule/confRoom/Conf_Room";
import {ConfModal} from "../../components/shedule/confRoom/Conf_Modal";
import {Conf_SelectEmp} from "../../components/shedule/confRoom/Conf_SelectEmp";

import {
	CCard,
	CCardBody,
	CCardHeader,
  } from '@coreui/react';


  import moment from 'moment';
import test from '../../components/shedule/confRoom/test.json';
import users from '../../components/shedule/confRoom/test2.js';

const ConfLayout = () => {
    const [time,setTime]=useState(0);
    const [click,setClick]=useState(false);
    const [emp_click,setEmp_click]=useState(false);


  const dateFormat = 'YYYY/MM/DD';

    return (
        <div>
        <CCard>
            <CCardHeader>
                <big>회의실 예약</big>
                {/* 버튼이랑 모달을 따로 분리해서 만들기/ */}
            <ConfModal click={click} time={moment(time).format(dateFormat)} setEmp_click={setEmp_click}></ConfModal>
            </CCardHeader>
                
            <CCardBody>
                <Conf_SelectEmp emp_click={emp_click}></Conf_SelectEmp>
                <ConfRoom setClick={setClick} setTime={setTime}></ConfRoom>
            </CCardBody>
        </CCard>

            {/* <ConfRoom name="hello" color="red" setData={setRoom}></ConfRoom>
             */}
            {/* 자식 컴포넌트에서 받은 데이터 출력 */}
            {/* {console.log("floor : " + floor + "room : "+room)} */}
            {/* {console.log("room : " + room)} */}

            
        </div>
    );
}


export default ConfLayout;
