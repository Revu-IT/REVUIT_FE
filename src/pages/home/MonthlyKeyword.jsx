import React, { useState, useEffect } from "react";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyKeywordStyle";

import Header from "../../components/Header";
import SentimentTabs from "../../components/SentimentTabs";
import { getWordCloud } from "../../axios/monthly";

import cloude from "../../assets/images/cloude.svg";

function MonthlyKeyword() {
    const [sentiment, setSentiment] = useState("positive");

    // 워드클라우드 상태
    const [imgUrl, setImgUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [cache, setCache] = useState({});

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setErr("");
                setLoading(true);

                // 캐시가 있으면 즉시 사용
                if (cache[sentiment]) {
                    if (!aborted) {
                        setImgUrl(cache[sentiment]);
                        setLoading(false);
                    }
                    return;
                }

                const res = await getWordCloud(sentiment);
                const url = res?.image_url || "";

                if (!aborted) {
                    setImgUrl(url);
                    setCache((p) => ({ ...p, [sentiment]: url }));
                }
            } catch (e) {
                if (!aborted) {
                    setErr(e?.message || "워드클라우드를 불러오지 못했습니다.");
                }
            } finally {
                if (!aborted) setLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
    }, [sentiment]);
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
                                    최대 50개의 키워드를 확인할 수 있어요.
                                </M.Subtitle>
                            </M.Container>
                            <SentimentTabs
                                value={sentiment}
                                onChange={setSentiment}
                            />
                            <M.KeywordCloude>
                                {loading ? (
                                    <C.StatusCard>
                                        <C.Spinner /> 불러오는 중…
                                    </C.StatusCard>
                                ) : err ? (
                                    <C.ErrorCard>{err}</C.ErrorCard>
                                ) : (
                                    <img
                                        src={imgUrl}
                                        alt={`wordcloud-${sentiment}`}
                                        style={{
                                            width: "80%",
                                            height: "80%",
                                            objectFit: "contain",
                                        }}
                                    />
                                )}
                            </M.KeywordCloude>
                        </M.Keyword>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyKeyword;
