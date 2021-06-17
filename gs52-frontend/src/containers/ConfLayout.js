import React from "react";
import {ConfRoom} from "../components/confRoom/ConfRoom.js";
import {ConfModal} from "../components/confRoom/ConfResrvation";

const ConfLayout = () => {
    return (
        <div>
            <ConfModal></ConfModal>
            <ConfRoom></ConfRoom>
        </div>
    );
}

export default ConfLayout;
