import { CCard } from "@coreui/react";
import { Col, Row } from "antd";

const annualCard = (props) => {
  console.log(props.empvacation.length);
  console.log(props);
  return (
    <>
      <CCard>
        <Row>
          {props.empvacation.length !== 0 && props.near.length !== 0 ? (
            <Col>
              <h4>
                {props.empvacation[0].emp_NAME}님의 잔여 휴가 :
                {props.empvacation[0].emp_VACATION}일
              </h4>
              <h4>다음 휴가는 {props.near[0].vacation_DATE}일 입니다</h4>
            </Col>
          ) : (
            <h4>휴가 정보가 없습니다.</h4>
          )}
        </Row>
      </CCard>
    </>
  );
};

export default annualCard;
