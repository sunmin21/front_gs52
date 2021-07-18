import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Col, Row } from "antd";

const annualCard = (props) => {
  return (
    <div style={{ boxShadow: "5px 5px 5px gray", backgroundColor: "#f9f9f9" }}>
      <CCardBody>
        <CRow>
          {props.empvacation.length !== 0 && props.near.length !== 0 ? (
            <CCol>
              <h5>{props.empvacation[0].emp_NAME}님의 잔여 연차</h5>
              <h2 style={{ textAlign: "center" }}>
                {props.empvacation[0].emp_VACATION}일
              </h2>
              <h5>다음 연차</h5>
              <h2 style={{ textAlign: "center" }}>
                {props.near[0].vacation_DATE}
              </h2>
            </CCol>
          ) : props.empvacation.length !== 0 && props.near.length == 0 ? (
            <CCol>
              <h5>{props.empvacation[0].emp_NAME}님의 잔여 연차</h5>
              <h2 style={{ textAlign: "center" }}>
                {props.empvacation[0].emp_VACATION}일
              </h2>
              <h5>다음 연차</h5>
              <h2 style={{ textAlign: "center" }}>-</h2>
              <p style={{ textAlign: "center" }}>다음 연차 정보가 없습니다.</p>
            </CCol>
          ) : (
            <h4> 연차 정보를 확인해주세요</h4>
          )}
        </CRow>
      </CCardBody>
    </div>
  );
};

export default annualCard;
