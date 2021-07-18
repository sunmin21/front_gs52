import React, { useEffect, useRef } from "react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
} from "@coreui/react";

import { useDispatch, useSelector } from "react-redux";
import { vacationAxios } from "src/modules/manager/vacation";
import AttendManage from "../../../components/manager/vacationManage/attendManage";
import BusinessManage from "../../../components/manager/vacationManage/businessManage";
import CompleteManage from "../../../components/manager/vacationManage/completeManage";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};

const VacationManage = () => {
  const vacation_EMP_INDEX = getCurrentUser();

  const dispatch = useDispatch();
  const { vacation } = useSelector((state) => {
    return {
      vacation: state.vacation.vacation,
    };
  });

  useEffect(() => {
    dispatch(vacationAxios());
  }, [dispatch]);

  return (
    <>
      <div style={contentStyle}>
        <h4 style={{ color: "white", marginTop: "5px" }}>연차 / 출장 관리</h4>
      </div>
      <CRow style={{ marginTop: "50px" }}>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            {/*<CCardHeader>연차/출장관리</CCardHeader>*/}
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>연차</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>출장</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>완료</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <AttendManage
                      content={vacation}
                      team={vacation_EMP_INDEX.team}
                      index={vacation_EMP_INDEX.index}
                    ></AttendManage>
                  </CTabPane>
                  <CTabPane>
                    <BusinessManage
                      content={vacation}
                      team={vacation_EMP_INDEX.team}
                      index={vacation_EMP_INDEX.index}
                    ></BusinessManage>
                  </CTabPane>
                  <CTabPane>
                    <CompleteManage
                      content={vacation}
                      team={vacation_EMP_INDEX.team}
                      index={vacation_EMP_INDEX.index}
                    ></CompleteManage>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default VacationManage;
