import React,{useState, useEffect} from "react";
import {ConfRoom} from "../../components/shedule/confRoom/Conf_Room";
import {ConfModal} from "../../components/shedule/confRoom/Conf_Modal";
import {ConfButton} from "../../components/shedule/confRoom/Conf_Button";
import {Conf_SelectEmp} from "../../components/shedule/confRoom/Conf_SelectEmp";
import Readonly from "../../components/shedule/confRoom/Readonly";




//import {sch} from "../../components/shedule/confRoom/Conf_sch";


import {
	CCard,
	CCardBody,
	CCardHeader,
  } from '@coreui/react';

  import { useSelector } from 'react-redux';



const ConfLayout = () => {
  const { conf_modal1, conf_modal2 } = useSelector((state) => {
      return ({   
        conf_modal1: state.conf_check.conf_modal1,
        conf_modal2: state.conf_check.conf_modal2,
      })
  });
  
    return (
        <div>
            {console.log("LAYOUTTTTTTTTTTTTT")}
        <CCard>
            
            <CCardHeader>
                <big>회의실 예약</big>
                
        {/* <Readonly></Readonly> */}
            </CCardHeader>
                
            <CCardBody>
            <ConfButton></ConfButton> 
            <ConfRoom ></ConfRoom>

            {
                conf_modal1===true ?
                <ConfModal></ConfModal> 
                : null
            }
            {
                conf_modal2===true ?
                <Conf_SelectEmp></Conf_SelectEmp> 
                : null
            }
            </CCardBody>
        </CCard>
            
        </div>
    );
}


export default ConfLayout;
