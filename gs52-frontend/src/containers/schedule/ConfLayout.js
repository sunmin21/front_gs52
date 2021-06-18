import React,{useState} from "react";
import {ConfRoom} from "../../components/shedule/confRoom/ConfRoom";
import {ConfModal} from "../../components/shedule/confRoom/ConfModal";

import {Link} from "react-router-dom";


import test from '../../components/shedule/confRoom/test.json';
import users from '../../components/shedule/confRoom/test2.js';

const ConfLayout = () => {
    const [room, setRoom] = useState(0);
    const [floor, setFloor] = useState(0);

    return (
        <div>
            {console.log(test)} 
           

            <ConfModal setFloor={setFloor} setRoom={setRoom}></ConfModal>
            <ConfRoom setData={setRoom}></ConfRoom>
            {/* <ConfRoom name="hello" color="red" setData={setRoom}></ConfRoom>
             */}
            {/* 자식 컴포넌트에서 받은 데이터 출력 */}
            {console.log("floor : " + floor + "room : "+room)}
            {/* {console.log("room : " + room)} */}

            
        </div>
    );
}


export default ConfLayout;
