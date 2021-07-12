import React, { useEffect, useState } from "react";
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI"
import {SelectWorkRule, SelectWorkStart, UpdateWorkEnd, SelectWorkCheck,InsertBreakStart,UpdateBreakEnd}from "src/lib/api/main/WorkRule"

import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

function WorkTime(){

    const user = getCurrentUser();
    const dispatch = useDispatch();
    const [workCheck,setWorkCheck] = useState(false);
    const [workState,setWorkState] = useState("출근");          //localstorage

    const [ruleIndex, setRuleIndex] = useState(null);
    const [workType, setWorkType] = useState(null);
    const [ruleStart, setRuleStart] = useState(null);
    const [ruleEnd, setRuleEnd] = useState(null);

    useEffect(async() => {
          await SelectWorkCheck(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            console.log("item.data[0]")
            console.log(item.data[0])
            if(item.data[0]==null){
                setWorkCheck(false)
                setWorkState("출근")
            }
            else{
                console.log("else")
                if(item.data[0].attend_END!=null){
                    console.log("퇴근")
                    setWorkState("퇴근")
                }
                else{
                    setWorkCheck(true)
                    if(localStorage.getItem("breakIndex")==null){
                        setWorkState("휴식")
                    }
                    else{
                        setWorkState("휴식종료")
                    }
                }
            }
        });
                
        await SelectWorkRule(user.team).then((item) => {
            setRuleIndex(item.data[0].work_RULE_INDEX);
            setWorkType(item.data[0].work_RULE_WORK_TYPE_INDEX);
            setRuleStart(item.data[0].work_RULE_START);
            setRuleEnd(item.data[0].work_RULE_END);
          });
      },[]);

      const onWork = async() =>{
        await SelectWorkCheck(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            if(item.data[0]==null){
                setWorkCheck(false)
                setWorkState("출근")
            }
            else{
                setWorkCheck(true)
                setWorkState("휴식")
            }
        });
        if(workState=="출근"){
            //출근
            console.log("출근")
            await SelectWorkStart(user.index, moment().format('YYYY-MM-DD'), moment().format('HH:mm'), ruleIndex, workType, ruleStart).then(()=>{
                setWorkState("휴식")
            });
        }
        else if(workState=="휴식"){
            //휴식
            console.log("휴식")
            const index=await InsertBreakStart(user.index, moment().format('YYYY-MM-DD'), moment().format('HH:mm')).then((item)=>{
                setWorkState("휴식종료")
                localStorage.setItem("breakIndex", item.data)
            })
        }
        else if(workState=="휴식종료"){
            //휴식종료
            console.log("휴식종료")
            await UpdateBreakEnd(localStorage.getItem("breakIndex"), moment().format('HH:mm'), moment().format('YYYY-MM-DD'), user.index).then(()=>{
                setWorkState("휴식")
                localStorage.removeItem("breakIndex")
            })
        }
        else if(workState=="퇴근"){
            console.log("퇴근")
            alert("퇴근처리되어 더 이상 기록되지 않습니다.")
        }
    }
    
    // 퇴근가능시간 이후에는 퇴근 버튼 활성화
    const onOffWork = () =>{
        UpdateWorkEnd(user.index, moment().format('YYYY-MM-DD'), moment().format('HH:mm'))
        setWorkState("퇴근")
    }

    return(
        <div>
            
            <button onClick={onWork}><h2>{workState}</h2></button>
            {/* {
                workCheck===false?
                <button onClick={onWork}><h2>{workState}</h2></button>
                :
                <button onClick={onWork}><h2>휴식</h2></button>
            } */}
            
            {
                //moment('18:01').format('HH:mm')>ruleEnd?
                moment().format('HH:mm')>ruleEnd && workState!="퇴근"?
                <button onClick={onOffWork}>퇴근</button>
                :
                null
            }
           
        </div>
    )
}

export default WorkTime;