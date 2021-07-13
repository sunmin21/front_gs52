import React,{useState,useEffect} from "react";
import AccountField from "../../../components/manager/account/Account_Regist"
import Search from "../../../components/task/BusinessProgress/Search"

import {logout, getCurrentUser} from "../../../lib/api/jwt/LoginAPI"
export function InformLayout(){

    useEffect(() => {
        const user = getCurrentUser();
        console.log(user)
      },[]);

const onClick = () =>{
  const user = localStorage.getItem("accessToken");
  console.log("user")
  console.log(user)
}
      return(
        <div>
            <Search></Search>
            <AccountField></AccountField>
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
