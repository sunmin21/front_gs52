import { CCard, CCardBody } from "@coreui/react";
import { Col, Row } from "antd";

const annualCard = (props) => {
  return (
    <>
      <CCardBody>
        <Row>
          {props.empvacation.length !== 0 && props.near.length !== 0 ? (
            <Col >
              <div style={{whiteSpace:"nowrap"}}>

              
              <h5 >{props.empvacation[0].emp_NAME}님의 잔여 휴가</h5>
              <h1>{props.empvacation[0].emp_VACATION}일</h1>
              
              <h4>다음 휴가는 <h1>{props.near[0].vacation_DATE}</h1> 입니다</h4>
            </div>
            </Col>
          ) : (
            <h4>휴가 정보가 없습니다.</h4>
          )}
        </Row>
      </CCardBody>
    </>
  );
};

export default annualCard;
