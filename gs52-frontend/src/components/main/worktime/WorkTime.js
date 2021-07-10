import React, { useEffect, useState } from "react";
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI"
import {SelectWorkRule, SelectWorkStart}from "src/lib/api/main/WorkRule"

import moment from 'moment';

const onWork = () =>{
    const user = getCurrentUser();
    console.log(moment().format('YYYY/MM/DD HH:mm'));
    /*
    const work_type = SelectWorkRule(user.team).then((item) => {
        console.log(item.data[0].work_RULE_INDEX);
        console.log(item.data[0].work_RULE_WORK_TYPE_INDEX);
        SelectWorkStart(user.index, moment().format('YYYY/MM/DD'), moment().format('HH:mm'), item.data[0].work_RULE_INDEX )
      });
      */
      SelectWorkStart();
//emp_index, date, start, type_index
    //SelectWorkStart(user.index, moment().format('YYYY/MM/DD'), moment().format('HH:mm'), work_type )
}

// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function WorkTime(){

    const [workType, setWorkType] = useState(null);

    return(
        <div>
            <button onClick={onWork}><h2>출근</h2></button><br/>
        </div>
    )
}

export default WorkTime;