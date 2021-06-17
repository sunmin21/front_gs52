import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormGroup, CLabel, CSelect, CCol, CInput, CInputGroupPrepend, CInputGroupText, CInputGroup
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";

export function ConfModal() {
  const [primary, setPrimary] = useState(false);
  

  return (
    <div>
		
		
		<h2>회의실 예약</h2><br/>
      <CButton
        color="primary"
        onClick={() => setPrimary(!primary)}
        className="mr-1">
        추가
      </CButton>

      <CModal
        show={primary}
        onClose={() => setPrimary(!primary)}
        color="primary"
      >
        <CModalHeader closeButton>
          <CModalTitle>회의실 예약</CModalTitle>
        </CModalHeader>
        <CModalBody>

		<h4>회의실 예약</h4>
			<CFormGroup row>
                <CCol md="3">
				 	<CFormGroup>
						<CLabel htmlFor="floor"></CLabel>
						<CSelect custom name="floor" id="floor">
						<option value="1">5층</option>
						<option value="2">6층</option>
						</CSelect>
					</CFormGroup>
                </CCol>
                <CCol md="3">
					<CFormGroup>
						<CLabel htmlFor="room"></CLabel>
						<CSelect custom name="room" id="room">
						<option value="1">1호</option>
						<option value="2">2호</option>
						</CSelect>
					</CFormGroup>
                </CCol>
				
                <CCol md="9">

				<CInput type="date" id="date-input" name="date-input" placeholder="date" />
				</CCol>
            </CFormGroup>
		
			


			<br/>


			<h5>상세설정</h5>

			<CFormGroup row>
                <CCol md="5">
				 	사용시간대
                </CCol>
                <CCol md="3">
					<CFormGroup>
						<CLabel htmlFor="room"></CLabel>
						<CSelect custom name="room" id="room">
						<option value="1">1호</option>
						<option value="2">2호</option>
						</CSelect>
					</CFormGroup>
                </CCol>
				
                <CCol md="5">
					일정초대
				</CCol>
				<CCol md="5">
				<div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput id="prependedInput" size="16" type="text" />
                        </CInputGroup>
                        <p className="help-block">초대 인원 선택하세요</p>
                      </div>
				</CCol>
            </CFormGroup>

        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setPrimary(!primary)}>
            등록
          </CButton>{" "}
          <CButton color="secondary" onClick={() => setPrimary(!primary)}>
            취소
          </CButton>
        </CModalFooter>
      </CModal>

    </div>
  );
}
export default ConfModal;
