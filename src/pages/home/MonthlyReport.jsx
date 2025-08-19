import React, { useState } from "react";
import * as C from "../../styles/CommonStyle";

import Header from "../../components/HeaderBack";
import SentimentTabs from "../../components/SentimentTabs";

function MonthlyReport() {
    const [sentiment, setSentiment] = useState("positive");
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <SentimentTabs
                            value={sentiment}
                            onChange={setSentiment}
                        />
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyReport;
