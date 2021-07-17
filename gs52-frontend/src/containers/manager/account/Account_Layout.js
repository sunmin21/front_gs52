import React,{useState,useEffect} from "react";
import AccountField from "../../../components/manager/account/Account_Regist"
import Search from "../../../components/task/BusinessProgress/Search"

import {logout, getCurrentUser} from "../../../lib/api/jwt/LoginAPI"

const contentStyle = {
  backgroundColor: "#3e4b54",
  width: "400px",
  textAlign: "center",
  boxShadow: "5px 5px 5px gray",
  padding: "8px",
  borderRadius: "50px",
};


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
             <div style={contentStyle}>
                <h4 style={{ color: "white", marginTop: "5px" }}>
                    계정 등록
                </h4>
            </div>
                <br/>
            <AccountField></AccountField>
            <Search></Search>
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
