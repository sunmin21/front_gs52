import React, { useEffect } from "react";
import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";

import Notice from "src/components/main/Notice";
import Test from "src/components/main/Test";
import { useDispatch, useSelector } from "react-redux";
import { noticeAxios } from "src/modules/main/main";
const Main = () => {
  const notice = useSelector((state) => state.main.notice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(noticeAxios());
  }, [dispatch]);
  console.log(notice);
  return (
    <>
      <CContainer>
        <CRow className="align-items-start">
          <CCol>
            <CCard accentColor="secondary">
              <CCardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit, sed diam nonummy nibh euismod
                tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
                enim ad minim veniam, quis nostrud exerci tation ullamcorper
                suscipit lobortis nisl ut aliquip ex ea commodo consequat. Lorem
                ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
                erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                commodo consequat. Lorem ipsum dolor sit amet, consectetuer
                adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
                minim veniam, quis nostrud exerci tation ullamcorper suscipit
                lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum
                dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
                nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
                tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
                commodo consequat.
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow className="align-items-center">
          <CCol>
            <Notice content={notice} />
          </CCol>

          <CCol>
            <Test />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default Main;
