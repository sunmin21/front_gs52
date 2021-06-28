import React from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CTabs,
} from "@coreui/react";
import { DocsLink } from "src/reusable";
import Dept from "src/components/manager/addOptions/Dept";
import Team from "src/components/manager/addOptions/Team";
import WorkRule from "src/components/manager/addOptions/WorkRule";
import ConfRoom from "src/components/manager/addOptions/ConfRoom";
import Notice from "src/components/main/Notice";
import Test from "src/components/main/Test";
const Main = () => {
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
            <Notice />
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
