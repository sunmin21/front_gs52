import { Component } from 'react';
import {Route, Redirect} from 'react-router';
import { TheLayout } from "../containers/common";
import Login from "../components/user/Login";

export function PrivateRoute ({component:Component, ...parentProps}){
    return(
        <Route  
            {...parentProps}
            render={props=>(
                //<TheLayout {...props} />    
                
                //로그인 체크
                localStorage.getItem('user')?(
                        //로그인 ㅇㅇ

                        <TheLayout {...props} />    
                    ) :(
                        //로그인 ㄴㄴ
                        <Route path="/" component={Login}/>
                    )
                )
            }
        />
    )
}


export default PrivateRoute;