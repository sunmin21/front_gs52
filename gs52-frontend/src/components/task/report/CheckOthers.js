import React, { useState } from 'react'
import { CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

function CheckOthers() {

    const [info, setInfo] = useState(false);

    return (
        <CCol col="2" className="text-center mt-3">
            <CButton color="danger" variant='outline'>
                <CIcon name="cil-user" /> 팀원 주간보고 조회하기
            </CButton>
        </CCol>
    )
}

export default CheckOthers;