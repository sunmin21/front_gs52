import React from "react";
import { CCardBody, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import Requested from './projectList/Requested';
import Proceeding from './projectList/Proceeding';
import Completed from './projectList/Completed';
import Expected from './projectList/Expected';

function ShowProject() {
    return (
        <CCardBody>
            <CTabs activeTab="requested">
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
                        <Requested />
                    </CTabPane>
                    <CTabPane data-tab="proceeding">
                        <Proceeding />
                    </CTabPane>
                    <CTabPane data-tab="completed">
                        <Completed />
                    </CTabPane>
                    <CTabPane data-tab="expected">
                        <Expected />
                    </CTabPane>
                </CTabContent>
            </CTabs>
        </CCardBody>
    )
}

export default ShowProject;