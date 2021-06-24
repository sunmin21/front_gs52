import React, { useEffect, useState } from "react";
import {
  CButton
} from "@coreui/react";
import { InsertConf } from "../../../lib/api/conf/ConfAPI";
import 'antd/dist/antd.css';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { modalCheck1 } from 'src/modules/schedule/conf';


export function ConfButton() {
const dispatch = useDispatch();
const { conf_modal1,conf_date } = useSelector((state) => {
  
  console.log("state.conf_check.conf_modal1      "+state.conf_check.conf_modal1)
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