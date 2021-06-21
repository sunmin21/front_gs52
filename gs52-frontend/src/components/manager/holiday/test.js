import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygridPlugin from '@fullcalendar/daygrid';
import axios from "axios";
import events from './Holidays.json';

import { CCard, CCardBody, CCardHeader, } from '@coreui/react'


class ShowCalendar extends Component {
    
    constructor(props) {
        super(props);
    }

    state = {
        data2: [],
    };
    
    getHolidayEvents = async () => {
        await axios.get("/holiday/h").then((data2) => {
            console.log("@2")
            this.setState(
                data2.data
            )
            console.log(data2.data)
            console.log(state)
        })
    }

    componentDidMount() {
        console.log('in componentDIdMount');
        this.getHolidayEvents();
    }

    componentDidUpdate() {
        console.log('in componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('in componentWillUnmount');
    }
    
    render() {
        console.log("render part " + JSON.stringify(this.state.data));
        console.log("Ssss");
        console.log(this.state.data2.data);
        console.log("Ssss");
        return (
            <CCard>
                <CCardHeader>
                    휴일 설정
                </CCardHeader>
                <CCardBody>
                    <div style={{backgroundColor:"coral"}}>
                        Here is Test Component
                        {JSON.stringify(this.state.data2.data)}
                        {
                            // this.state.data.map(() => {
                            //     return <p> name : {HOLIDAY_TITLE}</p>;
                            // })
                            console.log("너맞니"),
                            console.log(this.state.data2["data"]),
                            console.log("너맞니")
                        }
                        {/* {
                            this.state.data.map((data) => {
                                return <p>title : {data}</p>
                            })
                        } */}
                    </div>
                    {/* <button onClick={console.log(events)}>이벤트가나오나요</button> */}
                    <div className="mypage-body">
                        <div className="body-wrapper box">
                            <div className="body-info-container">
                                <div className="calendar-wrapper">
                                    <FullCalendar defaultView="dayGridMonth"
                                        plugins={[daygridPlugin]}
                                        // eve
                                        

                                    />
                                </div>
                            </div>
                        </div>
                    </div> 
                </CCardBody>
            </CCard>
        )
    }    
}

export default ShowCalendar