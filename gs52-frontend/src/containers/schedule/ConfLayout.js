import React from "react";
import {ConfRoom} from "../../components/shedule/confRoom/ConfRoom";
import {ConfModal} from "../../components/shedule/confRoom/ConfModal";

const ConfLayout = () => {
    return (
        <div>
            <ConfModal></ConfModal>
            <ConfRoom></ConfRoom>
        </div>
    );
}

export default ConfLayout;
