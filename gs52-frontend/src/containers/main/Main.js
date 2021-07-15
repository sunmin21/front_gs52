import React, { useEffect, useRef } from "react";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import MyCalendar from "src/components/main/Calendar/MyCalendar";
import { useDispatch, useSelector } from "react-redux";
import { noticeAxios } from "src/modules/main/main";
import AnnualCard from "src/components/main/annual/annual";
import { empvacationAxios, nearAxios } from "src/modules/annual/annual";

import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";
import TimeProgress from "src/components/main/worktime/TimeProgress";
import Notice from "src/components/main/notice/Notice";

const Main = () => {
  const dispatch = useDispatch();
  const vacation_EMP_INDEX = getCurrentUser();
  // const Notice = React.lazy(() => import("src/components/main/notice/Notice"));
  const notice = useSelector((state) => state.main.notice);
  useEffect(() => {
    dispatch(noticeAxios());
    dispatch(empvacationAxios(vacation_EMP_INDEX.index));
    dispatch(nearAxios(vacation_EMP_INDEX.index));
  }, [dispatch, vacation_EMP_INDEX.index]);

  const { empvacation, near } = useSelector((state) => {
    return {
      empvacation: state.annual.empvacation,
      near: state.annual.near,
    };
  });

  return (
    <>
      <CContainer>
        <CRow className="align-items-start">
          <CCol>
            <CCard accentColor="secondary">
              <CCardBody>
                <CRow>
                  <CCol sm="8" style={{marginTop:"45px"}}>
                    <TimeProgress/>
                  </CCol>
                  <CCol sm="4">
                    <AnnualCard
                      empvacation={empvacation}
                      near={near} />
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <Notice content={notice} /> 
          </CCol>
          <CCol>
            <MyCalendar />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Main;
