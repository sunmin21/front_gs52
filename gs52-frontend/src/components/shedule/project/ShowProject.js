import React from "react";
import { CCard, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";

function ShowProject() {
    return (
        <CCard>
             <CTabs activeTab="home">
            <CNav variant="tabs">
                <CNavItem>
                <CNavLink data-tab="home">
                    Home
                </CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink data-tab="profile">
                    Profile
                </CNavLink>
                </CNavItem>
                <CNavItem>
                <CNavLink data-tab="messages">
                    Messages
                </CNavLink>
                </CNavItem>
            </CNav>
            <CTabContent>
                <CTabPane data-tab="home">
                123
                </CTabPane>
                <CTabPane data-tab="profile">
                456
                </CTabPane>
                <CTabPane data-tab="messages">
                789
                </CTabPane>
            </CTabContent>
            </CTabs>
        </CCard>
    )
}

export default ShowProject;