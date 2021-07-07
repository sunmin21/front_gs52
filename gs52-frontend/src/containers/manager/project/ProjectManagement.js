import React from 'react'
import { CCardBody, CCol, CRow } from '@coreui/react'
import ProjectManage from 'src/components/manager/project/ProjectManage'

const ProjectManagement = () => {
    
    return (
        <CRow>
            <CCol>
                <CCardBody>
                    <ProjectManage />
                </CCardBody>
            </CCol>
        </CRow>
    )
}

export default ProjectManagement