import React, { useEffect, useState } from "react";
import {
  CButton
} from "@coreui/react";
import 'antd/dist/antd.css';

import { useDispatch, useSelector } from 'react-redux';
import { modalCheck1 } from 'src/modules/schedule/conf';


export function ConfButton() {


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
    onClick={() =>  dispatch(modalCheck1())}
  >
    추가
  </CButton>

    </div>
  );
}

export default ConfButton;