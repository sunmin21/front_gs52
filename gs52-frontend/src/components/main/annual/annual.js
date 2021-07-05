import { CCard } from "@coreui/react";
import { Col, Row } from "antd";

const annualCard = (props) => {
  console.log(props.empvacation.length);
  console.log(props);
  return (
    <>
      <CCard>
        <Row>
          {props.empvacation.length !== 0 && (
            <Col>
              {" "}
              {props.empvacation[0].emp_NAME}님의 잔여 휴가 :{" "}
              {props.empvacation[0].emp_VACATION}{" "}
            </Col>
          )}
        </Row>
      </CCard>
    </>
  );
};

export default annualCard;
