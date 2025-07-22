import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/Header";

function MonthlyKeyword() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="한달 키워드" />
                        <h1>한달 키워드</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyKeyword;
