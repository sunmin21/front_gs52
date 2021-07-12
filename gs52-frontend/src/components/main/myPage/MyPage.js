import React, {useEffect} from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter, CButton
  } from '@coreui/react';

import { useDispatch, useSelector } from 'react-redux';

export function ConfRoom(props) {

	const dispatch = useDispatch();

  	return (
		<div>
		    <CCard>
                <CCardHeader>
                  마이페이지
                </CCardHeader>
                <CCardBody>

                </CCardBody>



                <CCardFooter>              
                    <CButton type="submit" size="sm" color="primary" >Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton>
                </CCardFooter>
            </CCard>
		</div>
  	);
}

export default ConfRoom;
