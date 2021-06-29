import React, { useState } from 'react'
import { CCol, CButton, CModalBody, CModal, CModalHeader,  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import OthersList from './OthersList'

function CheckOthers() {

    const [danger, setDanger] = useState(false);

    return (
        <CCol col="2" className="text-center mt-3">
            <CButton color="danger" onClick={() => setDanger(!danger)}variant='outline'>
                <CIcon name="cil-user" /> 팀원 주간보고 조회하기
            </CButton>
            <CModal size="lg" show={danger} 
                onClose={() => setDanger(!danger)}
                color="danger">
                <CModalHeader>
                    팀원 주간보고 조회하기
                </CModalHeader>
                <CModalBody>
                    <h4>팀원 선택하기</h4>
                    <OthersList />
                </CModalBody>
            </CModal>
        </CCol>
    )
}

export default CheckOthers;