import React, { useEffect, useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CBadge,
  CDataTable,
} from "@coreui/react";
import usersData from './UsersData'

import { Select_emp,SelectConf } from "../../../lib/api/conf/ConfAPI";

const fields = ['name','registered', 'role', 'status']
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

export function Conf_SelectEmp(props) {

	const [primary, setPrimary] = useState(false);


  const click = () => {
    setPrimary(!primary);
  };

  useEffect(() => {
    // console.log('props.click 값이 설정됨');
    // console.log("modal click  "+props.click);
    // console.log("modal time  "+props.time);
    
    return () => {
    //   console.log('props.click 가 바뀌기 전..');
    //   console.log("modal click  "+props.click);
    //   console.log("modal time  "+props.time);
      setPrimary(!primary)
    };
  }, [props.emp_click]);

  return (
    <div>            
		<button  onClick={Select_emp}>sdfsdf</button>
      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>일정 초대</CModalTitle>
        </CModalHeader>


        <CModalBody>
            <CDataTable
              items={usersData}
              fields={fields}
              itemsPerPage={5}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                      <CBadge color={getBadge(item.status)}>
                        {item.status}
                      </CBadge>
                    </td>
                  )

              }}
            />
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
