import React, { useState, useEffect } from 'react'
import { CCol, CButton, CModalBody, CModal, CModalHeader, CModalFooter } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux';
import { searchInit } from "src/modules/task/reportemplist";

// 팀원 조회하기
const CheckOthers = ({ Content }) => {
    const [danger, setDanger] = useState(false);

    const dispatch = useDispatch();
    const { emplist } = useSelector(({ emp }) => ({
        emplist: emp.emplist,
    }))

    const [check, setCheck] = useState(false);
    useEffect(() => {
        dispatch(searchInit());
    }, [check, dispatch]);

    return (
        <CCol col="2" className="text-center mt-3">
            <CButton
                color="danger"
                onClick={() => (setDanger(!danger), setCheck(!check))} >
                <CIcon name="cil-user" /> 팀원 주간보고 조회하기
            </CButton>
            <CModal size="lg" show={danger} 
                onClose={() => setDanger(!danger)}
                color="danger">
                <CModalHeader>
                    팀원 주간보고 조회하기
                </CModalHeader>
                <CModalBody>
                    <Content check={check} />
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="info"
                        onClick={() => { return setDanger(!danger) }}>
                        닫기
                    </CButton>
                </CModalFooter>
            </CModal>
        </CCol>
    )
}

export default CheckOthers;