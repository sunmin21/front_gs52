import React,{useState, useEffect} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect
} from '@coreui/react';
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

import { SelectDept, InsertAccount } from "../../../lib/api/manager/Account/AccountRegistAPI";
import { all } from 'redux-saga/effects';

import { useDispatch, useSelector } from "react-redux";
import {
  DeptAxios,RankAxios,PositionAxios
} from "src/modules/manager/Account";

import {RegistAccount
} from "../../../lib/api/manager/Account/AccountRegistAPI";

export function AccountField() {


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(DeptAxios());
    dispatch(RankAxios());
    dispatch(PositionAxios());
  }, [dispatch]);

  const  {dept_list, rank_list,position_list } =
    useSelector((state) => {
      return {
        dept_list: state.account.dept_list,
        rank_list: state.account.rank_list,
        position_list: state.account.position_list,
      };
    });


	const [inputs, setInputs] = useState({
    name:null,
		dept:null,
		rank:null,
		position:null,
		num:null,
		date:null,
    email:null
	  })
	const { name, dept, rank, position, num, date, email} = inputs;
	
	const onChange = (e) => {
		//input에 name을 가진 요소의 value에 이벤트를 걸었다
		const { name, value } = e.target   
	
		// 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
		const nextInputs = {            
		//스프레드 문법으로 기존의 객체를 복사한다.
				...inputs,  
				[name]: value,
			}
		//만든 변수를 seInput으로 변경해준다.
			setInputs(nextInputs)       

	}

	const onRegist=()=>{
			//{InsertAccount(dept, rank, position, num, date)}
      //    username, email, password, position, rank, team
      const id = num;
      console.log(id)   //사원번호
      console.log(name)   //sunmin
      console.log(num)    //사원번호
      RegistAccount(id, name, email, num, position, rank, dept, 1).then(
        
        response => {
          alert("회원등록 되었습니다.");
        },
        error => {
          alert("회원등록 실패하였습니다.");
          console.log(error)
        }
      );
            console.log(inputs)

	}

  function onDate(dateString) {
    console.log(moment(dateString).format("YYYY/MM/DD"))
  }

    return (
        <div>
            <CCard>
                <CCardHeader>
                    계정 등록
                </CCardHeader>
                <CCardBody>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="num">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="num" name="num" placeholder="사원 번호 (초기 비밀번호로 설정됩니다.)" 
					            onChange={onChange} value={num||''}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="name">이름</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="name" name="name" placeholder="이름" 
				    	        onChange={onChange} value={name||''}/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="dept">부서</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={onChange} id="dept" name="dept" defaultValue={dept_list[0]}>
                    {dept_list.map((dept, idx) => {
                        return (
                        <option key={idx} value={dept.dept_INDEX} >
                            {dept.dept_NAME}
                        </option>
                        );
                    })}
                    </CSelect>
                  </CCol>
                </CFormGroup>

               
                <CFormGroup row>
                 <CCol md="3">
                   <CLabel htmlFor="rank">직급</CLabel>
                 </CCol>
                 <CCol xs="12" md="9">
                 <CSelect onChange={onChange} id="rank" name="rank">
                    {rank_list.map((rank, idx) => {
                        return (
                        <option key={idx} value={rank.rank_INDEX} >
                            {rank.rank_NAME}
                        </option>
                        );
                    })}
                    </CSelect>
                 </CCol>
               </CFormGroup>
               
               <CFormGroup row>
                 <CCol md="3">
                   <CLabel htmlFor="position" id="position" name="position">직책</CLabel>
                 </CCol>
                 <CCol xs="12" md="9">
                 <CSelect onChange={onChange}  id="position" name="position">
                    {position_list.map((position, idx) => {
                        return (
                        <option key={idx} value={position.position_INDEX} >
                            {position.position_NAME}
                        </option>
                        );
                    })}
                    </CSelect>
                 </CCol>
               </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date">입사일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <DatePicker
                    id="date" name="date"
				            onChange={onDate}
                    />
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email">이메일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="email" name="email" placeholder="이메일" 
				    	        onChange={onChange} value={email||''}/>
                  </CCol>
                </CFormGroup>

                
                </CCardBody>



                <CCardFooter>              
                    <CButton type="submit" size="sm" color="primary" onClick={onRegist}>Submit</CButton>
                    <CButton type="reset" size="sm" color="danger"> Reset</CButton>
                </CCardFooter>
            </CCard>
        </div>

    );

}

export default AccountField;