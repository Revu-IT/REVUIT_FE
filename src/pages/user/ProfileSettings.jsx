import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/Header";

function ProfileSettings() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="마이페이지" />
                        <h1>마이페이지</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default ProfileSettings;
