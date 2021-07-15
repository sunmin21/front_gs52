import { CCard, CCardBody, CCol, CRow } from "@coreui/react";
import { Col, Row } from "antd";

const annualCard = (props) => {
  return (
    <>
      <CCardBody>
        <CRow>
          {props.empvacation.length !== 0 && props.near.length !== 0 ? (
            <CCol>
              <h5>{props.empvacation[0].emp_NAME}님의 잔여 휴가</h5>
              <h1 style={{textAlign:"center"}}>{props.empvacation[0].emp_VACATION}일</h1>
              <h5>다음 휴가</h5><h1 style={{textAlign:"center"}}>{props.near[0].vacation_DATE}</h1>
            </CCol>
          ) : props.empvacation.length !== 0 && props.near.length == 0 ? (
            <CCol>
              <h5>{props.empvacation[0].emp_NAME}님의 잔여 휴가 :</h5>
              <h1 style={{textAlign:"center"}}>{props.empvacation[0].emp_VACATION}일</h1>
              <h5>다음 휴가</h5>
                <h1 style={{ textAlign: "center" }}>-</h1>
                <p style={{ textAlign: "center" }}>다음 휴가 정보가 없습니다.</p>
            </CCol>
          ) : (
            <h4> 휴가 정보를 확인해주세요</h4>
          )}
        </CRow>
      </CCardBody>
    </>
  );
};

export default annualCard;
