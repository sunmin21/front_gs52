import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
} from "@coreui/react";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DeleteVacation,
  UpdateVacation,
} from "src/lib/api/attendance/AnnualAPI";
import { annualAxios, empvacationAxios } from "src/modules/annual/annual";

function RowDeleteModal({
  info,
  setInfo,
  event,
  setRestVacation,
  vacation_EMP_INDEX,
  doubleCheck,
  setDoubleCheck,
}) {
  // const [info, setInfo] = useState(false);
  const dispatch = useDispatch();

  const rowDelete = async () => {
    // axios.post("/annual/delete", {
    //   vacation_DATE: event.날짜,
    // });

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
