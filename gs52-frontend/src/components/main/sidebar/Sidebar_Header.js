import {getCurrentUser} from "../../../lib/api/jwt/LoginAPI"
import WorkTime from "../worktime/WorkTime"
import moment from 'moment';
import { useEffect, useState } from "react";

import {SelectEmpImg} from "src/lib/api/main/SideBar"


// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function Sidebar_Header(){

    const user = getCurrentUser();

    const [img, setImg] = useState(null);
    useEffect(()=>{
        SelectEmpImg(user.index).then((res)=>{
            console.log("res.data[0]")
            console.log(res.data[0])
            if(res.data[0]!=null){
                setImg(res.data[0].emp_IMG_PATH)
                console.log(res)
                console.log("res")
            }
            else{
                setImg("/upload/empImages/default.png")
            }
        })
    },[])

    return(
        <div>
        <br />
        <img src={img} style={{ width: "150px",
                                height: "150px", 
                                borderRadius: '5px!important',
                                overflow: "hidden"}}/> 
        <h2>{user.id}</h2>
        {user.username}님, 접속하였습니다.<br/><br/>
        <WorkTime></WorkTime><br/><br/>
        </div>
    )
}

export default Sidebar_Header;