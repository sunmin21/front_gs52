import React, { useEffect, useState } from "react";
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI"
import {SelectWorkRule, SelectWorkStart, SelectWorkCheck}from "src/lib/api/main/WorkRule"

import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';

const onWork = () =>{
    const user = getCurrentUser();
    console.log(moment().format('YYYY/MM/DD HH:mm'));
    
    const work_type = SelectWorkRule(user.team).then((item) => {
        console.log(item.data[0]);
        console.log(item.data[0].work_RULE_INDEX);
        console.log(item.data[0].work_RULE_WORK_TYPE_INDEX);
        console.log(item.data[0].work_RULE_START);
        SelectWorkStart(user.index, moment().format('YYYY-MM-DD'), moment().format('HH:mm'), 
                        item.data[0].work_RULE_INDEX, item.data[0].work_RULE_WORK_TYPE_INDEX, item.data[0].work_RULE_START)
      });
      
      //SelectWorkStart();
//emp_index, date, start, type_index
    //SelectWorkStart(user.index, moment().format('YYYY/MM/DD'), moment().format('HH:mm'), work_type )
}

// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function WorkTime(){

    const user = getCurrentUser();
    const dispatch = useDispatch();
    const [workType, setWorkType] = useState(null);
    const [workCheck,setWorkCheck] = useState(null);

    useEffect(async() => {
        await SelectWorkRule(user.team).then((item) => {
            console.log(item.data[0]);
            console.log(item.data[0].work_RULE_INDEX);
            console.log(item.data[0].work_RULE_WORK_TYPE_INDEX);
            console.log(item.data[0].work_RULE_START);
            setWorkCheck(SelectWorkCheck(user.index, moment().format('YYYY-MM-DD')));
          });
       
      },[]);

    return(
        <div>
            {
                workCheck===0?
                <button onClick={onWork}><h2>출근</h2></button>
                :
                <button onClick={onWork}><h2>휴식</h2></button>
            }
           
        </div>
    )
}

export default WorkTime;