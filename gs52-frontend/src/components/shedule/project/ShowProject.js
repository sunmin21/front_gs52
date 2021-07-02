import React from "react";
import { CCard, CCardBody, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import ProjectList from './ProjectList';

function ShowProject() {
    return (
        <CCardBody>
            <CTabs activeTab="proceeding">
                <CNav variant="tabs">
                    <CNavItem>
                        <CNavLink data-tab="requested">
                            요청받은 프로젝트
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink data-tab="proceeding">
                            진행중인 프로젝트
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink data-tab="completed">
                            완료된 프로젝트
                        </CNavLink>
                    </CNavItem>
                    <CNavItem>
                        <CNavLink data-tab="expected">
                            예정된 프로젝트
                        </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane data-tab="requested">
                        <h1>requested</h1>
                    </CTabPane>
                    <CTabPane data-tab="proceeding">
                        <ProjectList />
                    </CTabPane>
                    <CTabPane data-tab="completed">
                        <h1>completed</h1>
                    </CTabPane>
                    <CTabPane data-tab="expected">
                        <h1>expected</h1>
                    </CTabPane>
                </CTabContent>
            </CTabs>
        </CCardBody>
    )
}

export default ShowProject;