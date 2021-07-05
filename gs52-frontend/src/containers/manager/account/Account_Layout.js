import React,{useState,useEffect} from "react";
import AccountField from "../../../components/manager/account/Account_Regist"
import Search from "../../../components/task/BusinessProgress/Search"

import {logout, getCurrentUser} from "../../../lib/api/jwt/LoginAPI"

export function InformLayout(){

    useEffect(() => {
        const user = getCurrentUser();
        console.log("user")
        console.log(user)
        if (user) {
        //   this.setState({
        //     currentUser: user,
        //     showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        //     showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        //   });
        }
      },[]);

const onClick = () =>{
  const user = getCurrentUser();
  console.log("user")
  console.log(user)
}
      return(
        <div>
        <button onClick = {onClick}>토큰</button>
            <button onClick = {logout}>로그아웃</button>
            <Search></Search>
            <AccountField>sdfsdf</AccountField>
        </div>
      );
}


// const InformLayout = () => {
    
//     return (
//         <div>
//             <Search></Search>
//             <AccountField>sdfsdf</AccountField>
//         </div>
//     );
// }

export default InformLayout;
