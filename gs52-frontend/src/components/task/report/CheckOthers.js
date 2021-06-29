import React, { useState } from 'react'
import { CCol, CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

function CheckOthers() {

    const [info, setInfo] = useState(false);

    return (
        <CCol col="2" className="text-center mt-3">
            <CButton color="secondary" variant='outline'>
                <CIcon name="cil-lightbulb" />Outline Button
            </CButton>
        </CCol>
    )
}

export default CheckOthers;