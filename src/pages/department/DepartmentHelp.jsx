import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";

function DepartmentHelp() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>부서 분류</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default DepartmentHelp;
