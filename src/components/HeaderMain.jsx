import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/components/HeaderMainStyle";

//import notificationOn from "../assets/images/notification_on.svg";
import notificationOff from "../assets/images/notification_off.svg";

function HeaderMain() {
    const navigate = useNavigate();

    const handleNoti = () => {
        navigate("/notification");
    };

    return (
        <>
            <H.Header>
                <H.Notification onClick={handleNoti}>
                    <img src={notificationOff} alt="알림" />
                </H.Notification>
            </H.Header>
        </>
    );
}

export default HeaderMain;
