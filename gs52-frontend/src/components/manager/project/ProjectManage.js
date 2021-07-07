import React from 'react'
import { CCol, CRow, CCard, CDataTable, CCardBody } from "@coreui/react";

const ProjectManage = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                        <h5>프로젝트 목록</h5>
                    <CCardBody>
                        <CDataTable />
                    </CCardBody>
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default ProjectManage