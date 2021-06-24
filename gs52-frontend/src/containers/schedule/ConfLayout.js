import React,{useState, useEffect} from "react";
import {ConfRoom} from "../../components/shedule/confRoom/Conf_Room";
import {ConfModal} from "../../components/shedule/confRoom/Conf_Modal";
import {ConfButton} from "../../components/shedule/confRoom/Conf_Button";
import {Conf_SelectEmp} from "../../components/shedule/confRoom/Conf_SelectEmp";

import {
	CCard,
	CCardBody,
	CCardHeader,
  } from '@coreui/react';

  import { useSelector } from 'react-redux';



const ConfLayout = () => {
    const [time,setTime]=useState(0);
    //const [conf_click,setConf_Click]=useState(false);
    const [emp_click,setEmp_click]=useState(false);


  const { conf_modal1 } = useSelector((state) => {
      return ({   
        conf_modal1: state.conf_check.conf_modal1,
      })
  });
  
    return (
        <div>
            {console.log("LAYOUTTTTTTTTTTTTT")}
        <CCard>
            <CCardHeader>
                <big>회의실 예약</big>
                
                <ConfButton></ConfButton> 
      <button>버어어튼</button>
            
            {
                conf_modal1===true ?
                <ConfModal></ConfModal> 
                : null
            }
            </CCardHeader>
                
            <CCardBody>
                <Conf_SelectEmp emp_click={emp_click}></Conf_SelectEmp>
                <ConfRoom ></ConfRoom>
            </CCardBody>
        </CCard>
            
        </div>
    );
}


export default ConfLayout;
