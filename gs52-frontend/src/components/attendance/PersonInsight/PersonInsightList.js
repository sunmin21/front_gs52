import {
  CCallout,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
import React from "react";

const PersonInsightList = () => {
  return (
    <>
      <CRow>
        <CCol xs="12" xl="4">
          <CCard
            accentColor="info"
            style={{ maxWidth: "30rem", maxHeight: "30rem" }}
          >
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="18" xl="4">
          {" "}
          <CCard accentColor="info" style={{ maxWidth: "30rem" }}>
            <CCardHeader>Header</CCardHeader>
            <CCardBody>
              <CCardTitle> card title</CCardTitle>
              <CCardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default React.memo(PersonInsightList);
