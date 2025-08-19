import React, { useState } from "react";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyKeywordStyle";

import Header from "../../components/Header";
import SentimentTabs from "../../components/SentimentTabs";

import cloude from "../../assets/images/cloude.svg";

function MonthlyKeyword() {
    const [sentiment, setSentiment] = useState("positive");
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <C.FixedHeaderWrapper>
                            <Header Title="분기별 키워드" />
                        </C.FixedHeaderWrapper>
                        <M.Keyword>
                            <M.Cloud>
                                <M.CloudImg src={cloude} />
                            </M.Cloud>
                            <M.Container>
                                <M.Title>
                                    <span>키워드 </span>클라우드
                                </M.Title>
                                <M.Date>오늘 09:00 기준</M.Date>
                                <M.Subtitle>
                                    최대 10개의 키워드를 확인할 수 있어요.
                                </M.Subtitle>
                            </M.Container>
                            <SentimentTabs
                                value={sentiment}
                                onChange={setSentiment}
                            />
                            <M.KeywordCloude></M.KeywordCloude>
                        </M.Keyword>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyKeyword;
