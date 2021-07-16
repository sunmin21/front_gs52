import React, { useEffect, useState } from "react";
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI"
import { CCard, CCardBody, CCol, CContainer, CRow,CProgress } from "@coreui/react";
import {SelectTotal, SelectWeekTotal, SelectVacation} from "src/lib/api/main/TimeProgress"
import {SelectWorkCheck} from "src/lib/api/main/SideBar"
import moment from 'moment';

export function TimeProgress() {
    const user = getCurrentUser();
    const [minute_52, setMinute_52] = useState(52*60)
    const [user_52, setUser_52] = useState(0);
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [breakTime, setBreakTime] =useState(null)

    const [week, setWeek] = useState(null)

    useEffect(async()=>{
        await SelectWorkCheck(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            console.log("item")
            console.log(item)
            console.log(item.data!=0)
            if(item.data!=0){
            if(item.data[0].attend_START!=null){
                setStartTime(item.data[0].attend_START)
            }
            if(item.data[0].attend_END!=null){
                setEndTime(item.data[0].attend_END)
            }
            if(item.data[0].attend_BREAK!=null){
                setBreakTime(item.data[0].attend_BREAK)
            }
        }
        })
        // await SelectTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
        //     console.log("SelectTotal")
        //     console.log(item)
        // })
        await SelectWeekTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            let a=0;
            for(let i=0; i<item.data.length; i++){
                a = a+item.data[i].attend_TOTAL;
                setUser_52(a)
            }

        })
        
        await SelectVacation(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            console.log("SelectVacation")
            console.log(item)
        })
        

    },[])

    const showStart = ()=>{
        var str = startTime.split(':')
        return(
            <div style={{width:'100px', textAlign:'center',}}>
                금일 출근시간  <div style={{color:'blue', textAlign:'center'}}> {str[0]}시 {str[1]}분 </div>
            </div>
        )
    }

    
    const showEnd = ()=>{
        var str = endTime.split(':')
        return(
            <div style={{width:'100px', textAlign:'center',}}>
                금일 퇴근시간  <div style={{color:'blue', textAlign:'center'}}> {str[0]}시 {str[1]}분 </div>
            </div>
        )
    }

    const showBreak = ()=>{
        return(
            <div style={{width:'120px',textAlign:'center'}}>
                금일 총 휴식시간 <div style={{color:'green', textAlign:'center'}}> {(breakTime/60).toFixed(0)}시간 {breakTime%60} 분</div>
            </div>
        )
    }

    return (

    <div style={{align:"center"}}>
        
        <h4>이번 주 예정근무시간  {parseInt(user_52/60)}시간 {user_52%60}분</h4>
        <h4>이번 주 근무시간  {parseInt(user_52/60)}시간 {user_52%60}분</h4>
        {/*{console.log("user_52/minute_52")}
        {console.log(user_52)}
    {console.log(user_52/minute_52*100)}*/}
        <CProgress value={user_52/minute_52*100} className="mb-3" style={{marginTop:"20px"}}/>


        <CRow>
                  <CCol sm="3">
                      
        {
            startTime!=null?
            showStart()        :
            null
        }
                  </CCol>
                  <CCol sm="3">
                      
        {
            endTime!=null?
            showEnd()        :
            null
        }
                  </CCol>
                  
                  <CCol sm="3">
                      

        {
            breakTime!=null?
            showBreak()        :
            null
        }
                  </CCol>
                </CRow>
        
    </div>
    );


}


export default TimeProgress;
