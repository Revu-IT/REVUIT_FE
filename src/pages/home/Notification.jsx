import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/Header";

function Notification() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="알림" />
                        <h1>알림</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Notification;
