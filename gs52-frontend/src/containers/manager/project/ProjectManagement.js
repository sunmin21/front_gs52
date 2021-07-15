import React from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import ProjectManage from 'src/components/manager/project/ProjectManage'

const ProjectManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <ProjectManage />
            </CCol>
        </CRow>
    )
}

export default ProjectManagement