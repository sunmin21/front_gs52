import React, { useState } from 'react'
import { CCol, CButton, CModalBody, CModal, CModalHeader,  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

function CheckOthers() {
    return (
        <CCol>
            <h4>다음주</h4><br />
                {/* <CDataTable
                    fields={fields}
                    items={nextdata}
                    itemsPerPage={10}
                    onRowClick={eventOnclick}
                    sorterValue={{column: "date", asc : "true"}}
                    pagination
                /> */}
        </CCol>
    )
}

export default CheckOthers