import React,{useState, useEffect} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CInput,
  CFormGroup, CCol, CLabel, CCardFooter, CButton, CSelect
} from '@coreui/react';

import { SelectDept, InsertAccount } from "../../../lib/api/manager/AccountRegist/AccountRegistAPI";
import { all } from 'redux-saga/effects';

import { useDispatch, useSelector } from "react-redux";
import {
  DeptAxios,RankAxios,PositionAxios
} from "src/modules/manager/Account";

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
		//dept:DEPT_SELECT[0],
		rank:null,
		position:null,
		num:null,
		date:null,
    email:null
	  })
	const { rank, position, num, date, email} = inputs;
	
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
<<<<<<< Updated upstream:gs52-frontend/src/components/manager/account/Account_Field.js
		
=======
      //    username, email, password, position, rank, team
      const id = num;
      console.log(id)   //사원번호
      console.log(name)   //sunmin
      console.log(num)    //사원번호
      RegistAccount(id, name, email, num, position, rank, dept, 1).then(
        
        response => {
          console.log("성공")
        },
        error => {
          console.log("실패")
        }
      );
>>>>>>> Stashed changes:gs52-frontend/src/components/manager/account/Account_Regist.js
            console.log(inputs)

	}
    const onClick=()=>{
      // //const res=SelectDept().then((res) => setDept({ index: res.dept_INDEX, name: res.dept_NAME }));  
      // const res = SelectDept().then((item) => item.map((i)=>({
      //   dept_INDEX : i.dept_INDEX,
      //   dept_NAME : i.dept_NAME,

      // })));
      
      // // const res=SelectDept().then((item) => {
      // //   console.log(item)
      // //   console.log(item[0].dept_INDEX)
      // //   console.log(item[0].dept_NAME)
      // //   setDept({item})
      // // });  
      // console.log(res)
    }

    // const handleDept = e =>{
    //     console.log(e.target)
	// 	setInputs(e.target.value);
	// };	    
    // const handlePosition = e =>{
	// 	//setFloor(e.target.value);
	// };	

    // const handleRank = e =>{
	// 	//setFloor(e.target.value);
	// };	

    return (
        <div>
            <button onClick={onClick}>sdfsdf</button>
            <CCard>
                <CCardHeader>
                    계정 등록
                </CCardHeader>
                <CCardBody>
<<<<<<< Updated upstream:gs52-frontend/src/components/manager/account/Account_Field.js
=======
                
              				
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


>>>>>>> Stashed changes:gs52-frontend/src/components/manager/account/Account_Regist.js
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="dept">부서</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={onChange} id="dept" name="dept">
                    {dept_list.map((dept, idx) => {
                        return (
                        <option key={idx} value={dept.dept_NAME} >
                            {dept.dept_NAME}
                        </option>
                        );
                    })}
                    </CSelect>
                  </CCol>
                </CFormGroup>

               
                <CFormGroup row>
                 <CCol md="3">
                   <CLabel htmlFor="emp_rank">직급</CLabel>
                 </CCol>
                 <CCol xs="12" md="9">
                 <CSelect onChange={onChange} id="rank" name="rank">
                    {rank_list.map((rank, idx) => {
                        return (
                        <option key={idx} value={rank.rank_NAME} >
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
                 <CSelect onChange={onChange}>
                    {position_list.map((position, idx) => {
                        return (
                        <option key={idx} value={position.position_NAME} >
                            {position.position_NAME}
                        </option>
                        );
                    })}
                    </CSelect>
                 </CCol>
               </CFormGroup>
               
<<<<<<< Updated upstream:gs52-frontend/src/components/manager/account/Account_Field.js
              				
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="num">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="num" name="num" placeholder="사원 번호" 
					            onChange={onChange} value={num||''}/>
                  </CCol>
                </CFormGroup>

=======
>>>>>>> Stashed changes:gs52-frontend/src/components/manager/account/Account_Regist.js

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date">입사일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                        date picker
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