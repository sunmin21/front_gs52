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

import { modalCheck2 } from 'src/modules/schedule/conf';
import { useDispatch, useSelector } from 'react-redux';

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
	console.log("emppppppppppppppp")
  	const dispatch = useDispatch();
	const { conf_modal2 } = useSelector((state) => {
		return ({   
		conf_modal2: state.conf_check.conf_modal2
		})
	});	

	const click = () => {
		dispatch(modalCheck2())
	};


  return (
    <div>            
		<CModal
			show={conf_modal2}
			onClose={() => dispatch(modalCheck2())}
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
          <CButton color="secondary" onClick={() => {dispatch(modalCheck2())}}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default Conf_SelectEmp;
