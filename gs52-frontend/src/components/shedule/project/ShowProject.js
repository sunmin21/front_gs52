import React, { useEffect, useState } from "react";
import { CCardBody, CTabs, CNav, CNavItem, CNavLink, CTabContent, CTabPane } from "@coreui/react";
import Requested from './projectList/Requested';
import Proceeding from './projectList/Proceeding';
import Completed from './projectList/Completed';
import Expected from './projectList/Expected';
import { useDispatch, useSelector } from "react-redux";
import { proceedingAxios } from "src/modules/schedule/project/projectList";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

function ShowProject() {

    const user = getCurrentUser();
    let [emp] = useState(user.index);
    
    const dispatch = useDispatch();
    const { proceeding } = useSelector((state) => {
        return {
            proceeding: state.projectList.proceeding,
        };
    });
    
    useEffect(() => {
        console.log("너돌아가니?")
        dispatch(proceedingAxios(emp));
    }, [dispatch]);
    
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
                        <Requested dispatch={dispatch} />
                    </CTabPane>
                    <CTabPane data-tab="proceeding">
                        <Proceeding dispatch={dispatch} proceeding={proceeding} />
                    </CTabPane>
                    <CTabPane data-tab="completed">
                        <Completed dispatch={dispatch} proceeding={proceeding} />
                    </CTabPane>
                    <CTabPane data-tab="expected">
                        <Expected dispatch={dispatch} proceeding={proceeding}/>
                    </CTabPane>
                </CTabContent>
            </CTabs>
        </CCardBody>
    )
}

export default ShowProject;