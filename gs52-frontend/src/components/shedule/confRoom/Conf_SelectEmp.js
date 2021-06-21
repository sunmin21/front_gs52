import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup,
  CLabel,
  CSelect,
  CCol,
  CInput,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroup
} from "@coreui/react";
import { InsertConf } from "../../../lib/api/conf/ConfAPI";
import 'antd/dist/antd.css';
import { TimePicker, DatePicker } from 'antd';


export function Conf_SelectEmp(props) {

	const [primary, setPrimary] = useState(false);

  const click = () => {
    setPrimary(!primary);
  };

  useEffect(() => {
    console.log('props.click 값이 설정됨');
    console.log("modal click  "+props.click);
    console.log("modal time  "+props.time);
    
    return () => {
      console.log('props.click 가 바뀌기 전..');
      console.log("modal click  "+props.click);
      console.log("modal time  "+props.time);
      setPrimary(!primary)
    };
  }, [props.emp_click]);

  return (
    <div>            
      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>일정 초대</CModalTitle>
        </CModalHeader>


        <CModalBody>
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

export default Conf_SelectEmp;
