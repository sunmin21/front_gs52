import React, { useEffect, useState } from "react";
import {getCurrentUser} from "src/lib/api/jwt/LoginAPI"
import {
    CProgress
} from "@coreui/react";
import {SelectTotal, SelectWeekTotal} from "src/lib/api/main/TimeProgress"
import moment from 'moment';

export function TimeProgress() {
    const user = getCurrentUser();
    const [minute_52, setMinute_52] = useState(52*60)
    const [user_52, setUser_52] = useState(0);

    const [week, setWeek] = useState(null)

    useEffect(async()=>{
        /*
        SelectTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            if(item.data[0]!=null){
                setUser_52(item.data[0].attend_TOTAL)
            }
        })*/

        await SelectWeekTotal(user.index, moment().format('YYYY-MM-DD')).then((item)=>{
            let a=0;
            for(let i=0; i<item.data.length; i++){
                a = a+item.data[i].attend_TOTAL;
                setUser_52(a)
            }

        })
    },[])

    return (

    <div style={{align:"center"}}>
        <h3>이번 주 근무시간  {parseInt(user_52/60)}시간 {user_52%60}분</h3>
        {/*{console.log("user_52/minute_52")}
        {console.log(user_52)}
    {console.log(user_52/minute_52*100)}*/}
        <CProgress value={user_52/minute_52*100} className="mb-3" style={{marginTop:"20px", padding:"15px"}}/>
    </div>
    );
}

export default TimeProgress;
