import React from "react";
import { CCard, CCardBody, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import ProjectList from './ProjectList';

function ShowProject() {
    return (
        <CCardBody>
            <CTabs activeTab="home">
                <CNav variant="tabs">
                    <CNavItem>
                    <CNavLink data-tab="home">
                        진행중인 프로젝트
                    </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CNavLink data-tab="profile">
                        완료된 프로젝트
                    </CNavLink>
                    </CNavItem>
                    <CNavItem>
                    <CNavLink data-tab="messages">
                        예정된 프로젝트
                    </CNavLink>
                    </CNavItem>
                </CNav>
                <CTabContent>
                    <CTabPane data-tab="home">
                    <ProjectList />
                    </CTabPane>
                    <CTabPane data-tab="profile">
                    456
                    </CTabPane>
                    <CTabPane data-tab="messages">
                    789
                    </CTabPane>
                </CTabContent>
            </CTabs>
        </CCardBody>
    )
}

export default ShowProject;