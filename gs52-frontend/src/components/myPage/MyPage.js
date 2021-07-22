import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CInput,
    CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect, CRow,
  } from '@coreui/react';

import { useSelector } from 'react-redux';

export function MyPage() {  
    const history = useHistory();
    const { emp_list } =
      useSelector((state) => {
        return {
            emp_list: state.mypage.emp_list,
        };
      });
    
    const emp_data = emp_list.map((item) => ({
        name: item.emp_NAME,
        id:item.emp_ID,
        date:item.emp_ENTRY_DATE,
        email:item.emp_EMAIL,
        address:item.emp_ADDRESS,
        phone:item.emp_PHONE,
        birth:item.emp_BIRTH,
        team:item.team_NAME,
        rank:item.rank_NAME,
        position:item.position_NAME,
        dept:item.dept_NAME,
        img:item.emp_IMG_PATH
      }));  

    const tableStyle = {
      width:"200px",
      textAlign:"left",
      padding:"20px 20px 20px 20px",
      margin:"10px",
      background:"#F5F5F5",
      border:"10px solid #ffffff",
    }

    const tableStyle2 = {
      border:"1px solid #D9D9D9",
      textAlign:"left",
      padding:"20px 200px 20px 20px",
      borderRight:"none",
    }

  	return (
		<div>
      <CCardBody>
        <table style={{textAlign: "center", margin: "auto"}}>
          <tbody>
          <tr>
            <td style={{paddingRight:"100px"}} rowSpan="7">
              <img
                src={emp_data[0].img==null?"/upload/empImages/default.png":emp_data[0].imx}
                style={{
                width: "200px",
                height: "225px",
                borderRadius: "5px",
                overflow: "hidden",
                }}
              />
            </td>
            <td style={tableStyle}>
              <h5>이름</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].name}</h5>
            </td>
          </tr> 
          <tr>
            <td style={tableStyle}>
              <h5>사원번호</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].id}</h5>
            </td>
          </tr> 
          <tr>
            <td style={tableStyle}>
              <h5>부서/팀/직책/직급</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].dept} / {emp_data[0].team} / {emp_data[0].position} / {emp_data[0].rank}</h5>
            </td>
          </tr>
          <tr>
            <td style={tableStyle}>
              <h5>입사일</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].date}</h5>
            </td>
          </tr>
          <tr>
            <td style={tableStyle}>
              <h5>이메일</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].email}</h5>
            </td>
          </tr>
          <tr>
            <td style={tableStyle}>
              <h5>연락처</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].phone}</h5>
            </td>
          </tr>
          <tr>
            <td style={tableStyle}>
              <h5 htmlFor="address">주소</h5>
            </td>
            <td style={tableStyle2}>
              <h5 className="form-control-static">{emp_data[0].address}</h5>
            </td>
          </tr>
          </tbody>
        </table>
      </CCardBody>
		</div>
  	);
}

export default MyPage;
