import React, { useEffect, useRef } from "react";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";

import TabCalendar from "src/components/main/Calendar/MyCalendar";
import { useDispatch, useSelector } from "react-redux";
import { noticeAxios } from "src/modules/main/main";
import AnnualCard from "src/components/main/annual/annual";
import { empvacationAxios } from "src/modules/annual/annual";
import { getCurrentUser } from "src/lib/api/jwt/LoginAPI";

const Main = () => {
  const dispatch = useDispatch();
  const vacation_EMP_INDEX = getCurrentUser();

  const Notice = React.lazy(() => import("src/components/main/notice/Notice"));
  const notice = useSelector((state) => state.main.notice);
  useEffect(() => {
    dispatch(noticeAxios());
    dispatch(empvacationAxios(vacation_EMP_INDEX.index));
  }, [dispatch]);

  const { empvacation } = useSelector((state) => {
    return {
      empvacation: state.annual.empvacation,
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
                  <CCol sm="8">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor
                    sit amet, consectetuer adipiscing elit, sed diam nonummy
                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                    tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                    commodo consequat. Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                    minim veniam, quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                    sed diam nonummy nibh euismod tincidunt ut laoreet dolore
                    magna aliquam erat volutpat. Ut wisi enim ad minim veniam,
                    quis nostrud exerci tation ullamcorper suscipit lobortis
                    nisl ut aliquip ex ea commodo consequat. Lorem ipsum dolor
                    sit amet, consectetuer adipiscing elit, sed diam nonummy
                    nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                    tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                    commodo consequat.
                  </CCol>
                  <CCol sm="4">
                    <AnnualCard empvacation={empvacation}></AnnualCard>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="align-items-center">
          <CCol>
            <Notice content={notice} />
          </CCol>
          <CCol>
            <TabCalendar />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Main;
