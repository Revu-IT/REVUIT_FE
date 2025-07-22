import React from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderMain";

function Home() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <h1>홈</h1>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Home;
