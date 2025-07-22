import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";

function Signin() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>로그인</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Signin;
