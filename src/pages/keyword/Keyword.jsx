import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";

function Keyword() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>키워드</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Keyword;
