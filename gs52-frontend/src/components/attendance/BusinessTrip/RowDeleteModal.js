import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
} from "@coreui/react";

import React from "react";
import { useDispatch } from "react-redux";
import { DeleteVacation } from "src/lib/api/attendance/AnnualAPI";
import { annualAxios, empvacationAxios } from "src/modules/annual/annual";

function RowDeleteModal({
  info,
  setInfo,
  event,

  vacation_EMP_INDEX,
  doubleCheck,
  setDoubleCheck,
}) {
  const dispatch = useDispatch();

  const rowDelete = async () => {
    await DeleteVacation(event.날짜, vacation_EMP_INDEX.index);
    dispatch(annualAxios(vacation_EMP_INDEX.index));

    dispatch(empvacationAxios(vacation_EMP_INDEX.index));

    setInfo(!info);
  };
  return (
    <>
      <div className="modalHandler">
        <CModal show={info} onClose={() => setInfo(!info)} color="info">
          <CModalHeader closeButton>
            <CModalTitle>휴가 취소</CModalTitle>
          </CModalHeader>
          <CModalBody>{event.날짜}의 연차를 취소하겠습니까?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setInfo(!info)}>
              취소
            </CButton>
            <CButton
              color="info"
              onClick={() => {
                if (doubleCheck) {
                  rowDelete();
                  setDoubleCheck(false);
                }
              }}
            >
              확인
            </CButton>{" "}
          </CModalFooter>
        </CModal>
      </div>
    </>
  );
}

export default React.memo(RowDeleteModal);
