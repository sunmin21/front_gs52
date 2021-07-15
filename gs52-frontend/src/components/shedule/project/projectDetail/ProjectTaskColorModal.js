import {
  UpdateConfRoom,
  SelectCheckConfRoom,
} from "src/lib/api/manager/addOptions/addOptions";
import React, { useCallback, useState } from "react";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { UpdateProjectWith } from "src/lib/api/schedule/Project";
import { within } from "@testing-library/react";
import colors from "./colors";
const {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CInput,
  CSelect,
  CCol,
  CFormGroup,
  CAlert,
} = require("@coreui/react");

const ProjectTaskColorModal = ({
  visible,
  setVisible,
  dispatch,
  axios,
  axios2,
  projectNo,
  empIndex,
  empcolor,
  withIndex,
}) => {
  const [color, setColor] = useState(empcolor);
  // const colors = [
  //   "paleturquoise",
  //   "orange",
  //   "lightsteelblue",
  //   "peachpuff",
  //   "Chartreuse",
  //   "CornflowerBlue",
  // ];
  return (
    <CModal show={visible}>
      <CModalHeader>
        <CModalTitle>색깔지정</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol xs="12" md="12" size="lg">
            <div>
              <h2>색상을 선택하세요.</h2>
              <div style={{ display: "flex" }}>
                {colors.map((color) => (
                  <CButton
                    key={color + "Zxcasd"}
                    name={color}
                    style={{
                      background: color,
                      width: "24px",
                      height: "24px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      setColor(e.target.name);
                    }}
                  />
                ))}
              </div>
              <hr />
            </div>
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="secondary"
          onClick={() => {
            setVisible(false);
          }}
        >
          취소
        </CButton>

        <CButton
          color="primary"
          onClick={async () => {
            await UpdateProjectWith({ color, withIndex });

            await dispatch(axios(projectNo));

            await dispatch(axios2(projectNo));

            setVisible(false);
          }}
        >
          저장
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default React.memo(ProjectTaskColorModal);
