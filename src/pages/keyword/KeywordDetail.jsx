import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/Header";

function KeywordDetail() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="키워드별 분석" />
                        <h1>키워드</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default KeywordDetail;
