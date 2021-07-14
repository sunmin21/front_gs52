import React, { useEffect, useState } from "react";
import {
  CButton
} from "@coreui/react";
import 'antd/dist/antd.css';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { modalCheck1, modalStartTime, modalEndTime} from 'src/modules/schedule/conf';


export function ConfButton() {

const onClick = () => {
  dispatch(modalCheck1())
  dispatch(modalStartTime(moment().format('HH:mm')))
  dispatch(modalEndTime(moment().add(30,'m').format('HH:mm')))
}

const dispatch = useDispatch();
const { conf_modal1,conf_date } = useSelector((state) => {
  
    return ({   
        conf_modal1: state.conf_check.conf_modal1,
		conf_date: state.conf_check.conf_date
    })
});

  return (
    <div>              
        <CButton color="primary"
    onClick={onClick} style={{ textAlign: "right", margin:"auto"}}
  >
    추가
  </CButton>

    </div>
  );
}

export default ConfButton;