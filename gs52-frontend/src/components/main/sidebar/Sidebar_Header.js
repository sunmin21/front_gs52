import {getCurrentUser} from "../../../lib/api/jwt/LoginAPI"

import moment from 'moment';

const onWork = () =>{
    console.log(moment().format('YYYY/MM/DD HH:mm'));
}

// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function Sidebar_Header(){

    const user = getCurrentUser();

    return(
        <div>
        <button onClick={onWork}><h2>출근</h2></button><br/>
        <br />
        <h2>{user.id}</h2><br/>
        {user.username}님, 접속하였습니다.<br/>
        여기에다가 유저정보넣자아아</div>
    )
}

export default Sidebar_Header;