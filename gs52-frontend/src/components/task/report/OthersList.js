import React, { useState } from 'react'
import { CCol, CButton, CModalBody, CModal, CModalHeader, CDataTable } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux';

function CheckOthers() {

    let [emp] = useState(2);
    const dispatch = useDispatch();
    
    const fields = ['contents','date']

    return (
        <CCol>
            <h4>다음주</h4><br />
                <CDataTable
                    // fields={fields}
                    // items={nextdata}
                    // itemsPerPage={10}
                    // onRowClick={eventOnclick}
                    // sorterValue={{column: "date", asc : "true"}}
                    // pagination
                />
        </CCol>
    )
}

export default CheckOthers