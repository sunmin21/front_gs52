import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CInput
} from '@coreui/react'

export function ConfModal(props) {
    return (
        <div>
            <CCard>
                <CCardHeader>
                    회원정보입력
                    <small> Form</small>
                </CCardHeader>
                <CCardBody>
                    <CInput id="title" name="title" placeholder="제목을 입력하세요." />
                </CCardBody>
            </CCard>
        </div>

    );

}
