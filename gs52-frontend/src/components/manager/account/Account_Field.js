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
  DeptAxios
} from "src/modules/manager/Account";

export function AccountField() {


  const dispatch = useDispatch();
  useEffect(() => {
    console.log("sdfsdfsdfsdfsdf")
    dispatch(DeptAxios());
  }, [dispatch]);

  const  {dept_list } =
    useSelector((state) => {
      console.log(state);
      return {
        dept_list: state.account.dept_list,
      };
    });


    const DEPT_SELECT = ["1", "2"];
    const POSITION_SELECT = ["3", "4"];
    const RANK_SELECT = ["5", "6"];

    const [dept, setDept] = useState([{
      index:'',
      name:''
    }])

    // const [position, setPosition] = useState([{
    //   index:'',
    //   name:''
    // }])

    // const [rank, setRank] = useState([{
    //   index:'',
    //   name:''
    // }])

    


	const [inputs, setInputs] = useState({
		//dept:DEPT_SELECT[0],
		rank:RANK_SELECT[0],
		position:POSITION_SELECT[0],
		num:123,
		date:123,
	  })
	const { rank, position, num, date} = inputs;
	
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
			{InsertAccount(dept, rank, position, num, date)}
		
            console.log(inputs)

	}
//.then((res) => this.setState({ users: res }))
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
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="dept">부서</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect onChange={onChange} id="dept" name="dept">
                    {DEPT_SELECT.map((dept, idx) => {
                        return (
                        <option key={idx} value={dept} >
                            {dept}번
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
                    {RANK_SELECT.map((rank, idx) => {
                        return (
                        <option key={idx} value={rank} >
                            {rank}
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
                    {POSITION_SELECT.map((position, idx) => {
                        return (
                        <option key={idx} value={position} >
                            {position}
                        </option>
                        );
                    })}
                    </CSelect>
                 </CCol>
               </CFormGroup>
               
              
{/* 				
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="num">사원번호</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="num" name="num" placeholder="사원 번호" 
					onChange={onChange} value={num||''}/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date">입사일</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                        date picker
                  </CCol>
                </CFormGroup> */}
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