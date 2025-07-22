import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";

function Signup() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>회원가입</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Signup;
