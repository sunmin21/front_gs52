import {getCurrentUser} from "../../../lib/api/jwt/LoginAPI"
import WorkTime from "../worktime/WorkTime"

import moment from 'moment';


// 퇴근가능시간 이후에는 퇴근 버튼 활성화

function Sidebar_Header(){

    const user = getCurrentUser();

    return(
        <div>
        <WorkTime></WorkTime>
        <br />
        <h2>{user.id}</h2><br/>
        {user.username}님, 접속하였습니다.<br/>
        </div>
    )
}

export default Sidebar_Header;