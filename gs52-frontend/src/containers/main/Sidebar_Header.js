import {getCurrentUser} from "../../lib/api/jwt/LoginAPI"

import moment from 'moment';

const onWork = () =>{
    console.log(moment().format('YYYY/MM/DD HH:mm'));
}

function Sidebar_Header(){

    const user = getCurrentUser();

    return(
        <div>
        <button onClick={onWork}>추우우울그으으은</button><br/>
        {user.id}<br/>
        {user.username}<br/>
          여기에다가 유저정보넣자아아</div>
    )
}

export default Sidebar_Header;