import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/Header";

function Competitor() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="경쟁사 분석" />
                        <h1>경쟁사 분석</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Competitor;
