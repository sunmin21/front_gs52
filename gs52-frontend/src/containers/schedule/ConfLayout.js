import React,{useState, useEffect} from "react";
import {ConfRoom} from "../../components/shedule/confRoom/Conf_Room";
import {ConfModal} from "../../components/shedule/confRoom/Conf_Modal";
import {ConfButton} from "../../components/shedule/confRoom/Conf_Button";
import {Conf_SelectEmp} from "../../components/shedule/confRoom/Conf_SelectEmp";
import Readonly from "../../components/shedule/confRoom/Readonly";
import moment from 'moment';

import { useDispatch, useSelector } from "react-redux";
import {
    ConfAxios,
    FloorAxios,
  } from "src/modules/schedule/conf";


//import {sch} from "../../components/shedule/confRoom/Conf_sch";


import {
	CCard,
	CCardBody,
	CCardHeader,
  } from '@coreui/react';




const ConfLayout = () => {
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(FloorAxios());
        dispatch(ConfAxios())
      }, [dispatch]);

  const { conf_list, floor_list,conf_modal1, conf_modal2 } = useSelector((state) => {
      return ({   
        conf_list: state.conf_check.conf_list,
        floor_list: state.conf_check.floor_list,
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

            {/* data의 길이가 0일 때, confroom이 렌더링 되도록 만들었다. 근데 이렇게 하면 데이터가 아무것도 없을때는 렌더링되지 않는다는 문제가 생긴다.... */}
            {
                conf_list.length !== 0 ?
                //conf_list.length !== 0 ?
                <ConfRoom></ConfRoom>
                : null
            }

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
