import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";

function MonthlyReport() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>한달 리포트</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyReport;
