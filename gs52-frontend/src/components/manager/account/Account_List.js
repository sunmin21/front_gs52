import React,{useState} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,CDataTable,CBadge,
  CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect
} from '@coreui/react';

import usersData from './UsersData';


export function AccountList() {

    const getBadge = status => {
        switch (status) {
          case 'Active': return 'success'
          case 'Inactive': return 'secondary'
          case 'Pending': return 'warning'
          case 'Banned': return 'danger'
          default: return 'primary'
        }
    }
        
      const fields = ['name','registered', 'role', 'status']

    return (
        <div>
            <CCard>
                <CCardHeader>
                    계정 목록
                </CCardHeader>

                <CCardBody>
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

                </CCardBody>

                <CCardFooter>              
                    {/* <CButton type="submit" size="sm" color="primary">Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton> */}
                </CCardFooter>
            </CCard>
        </div>

    );

}

export default AccountList;