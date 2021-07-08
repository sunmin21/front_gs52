import React, { useState } from "react";

import "antd/dist/antd.css";

import { UpdateProjectWith } from "src/lib/api/schedule/Project";

const {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInput,
  CCol,
  CFormGroup,
  CLabel,
  CTextarea,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} = require("@coreui/react");

const ProjectTaskColorModal = ({
  visible,
  setVisible,
  dispatch,
  axios,
  projectNo,
  empIndex,
  empcolor,
  withIndex,
}) => {
  const [color, setColor] = useState(empcolor);
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
    "Black",
    "Chartreuse",
    "CornflowerBlue",
  ];
  const array = [];
  for (let i = 5; i <= 100; i += 5) {
    array.push(i);
  }
  console.log(array);
  const [content, setContent] = useState({
    내용: "",
    진행도: "",
  });
  return (
    <>
      <CModal show={visible}>
        <CModalHeader>
          <CModalTitle>할일 추가 </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">프로젝트 할일</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              <CTextarea
                name="내용"
                id="textarea-input"
                rows="6"
                placeholder="Content..."
                value={content.내용}
                onChange={(e) => {
                  setContent((cont) => ({
                    ...cont,
                    내용: e.target.value,
                  }));
                }}
              />
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol md="3">
              <CLabel htmlFor="textarea-input">진행도</CLabel>
            </CCol>
            <CCol xs="12" md="9">
              {/* <CInput
                name="요청사항"
                id="textarea-input"
                rows="6"
                placeholder="Content..."
              /> */}
              <CDropdown dark>
                <CDropdownToggle color="secondary">
                  Dropdown button
                </CDropdownToggle>
                <CDropdownMenu>
                  {array.map((item) => {
                    <CDropdownItem
                      onClick={(e) => {
                        console.log(e);
                        setContent((cont) => ({
                          ...cont,
                          진행도: e.target.value,
                        }));
                      }}
                    >
                      {item}%
                    </CDropdownItem>;
                  })}
                </CDropdownMenu>
              </CDropdown>
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

              setVisible(false);
            }}
          >
            저장
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default React.memo(ProjectTaskColorModal);
