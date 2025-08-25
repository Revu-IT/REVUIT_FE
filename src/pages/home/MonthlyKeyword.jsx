// pages/home/MonthlyKeyword.jsx
import React, { useEffect, useState } from "react";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyKeywordStyle";

import Header from "../../components/Header";
import SentimentTabs from "../../components/SentimentTabs";
import { getWordCloud } from "../../axios/monthly";

import cloude from "../../assets/images/cloude.svg";

function MonthlyKeyword() {
    const [sentiment, setSentiment] = useState("positive");

    // ✅ 페이지 단일 게이트
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    // 캐시: 감성별 이미지 URL / 에러 메시지
    const [cache, setCache] = useState({ positive: "", negative: "" });
    const [errMap, setErrMap] = useState({ positive: "", negative: "" });

    // 현재 탭에 표출할 URL
    const currentUrl = cache[sentiment];
    const currentErr = errMap[sentiment];

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                // ✅ 두 감성을 동시에 프리패치
                const [posRes, negRes] = await Promise.allSettled([
                    getWordCloud("positive"),
                    getWordCloud("negative"),
                ]);
                if (aborted) return;

                const nextCache = { positive: "", negative: "" };
                const nextErr = { positive: "", negative: "" };

                if (posRes.status === "fulfilled") {
                    nextCache.positive = posRes.value?.image_url || "";
                } else {
                    nextErr.positive =
                        posRes.reason?.response?.data?.detail ||
                        posRes.reason?.message ||
                        "긍정 워드클라우드를 불러오지 못했습니다.";
                }

                if (negRes.status === "fulfilled") {
                    nextCache.negative = negRes.value?.image_url || "";
                } else {
                    nextErr.negative =
                        negRes.reason?.response?.data?.detail ||
                        negRes.reason?.message ||
                        "부정 워드클라우드를 불러오지 못했습니다.";
                }

                setCache(nextCache);
                setErrMap(nextErr);

                // ✅ 페이지 노출 조건: 최소한 현재 선택된 감성의 데이터가 준비되어야 함
                const hasCurrent =
                    (sentiment === "positive" && !!nextCache.positive) ||
                    (sentiment === "negative" && !!nextCache.negative);
                const anySuccess = !!nextCache.positive || !!nextCache.negative;

                if (!hasCurrent && !anySuccess) {
                    setPageError("워드클라우드를 불러오지 못했습니다.");
                }
            } catch (e) {
                console.log(e);
                if (!aborted)
                    setPageError("워드클라우드를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setPageLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
        // sentiment를 의존성에 넣지 않음: 최초 1회만 프리패치
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    {/* ✅ 페이지 전체 게이트: 로딩/에러 동안 헤더 포함 가림 */}
                    {pageLoading ? (
                        <div
                            style={{
                                minHeight: "100dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                            }}
                        >
                            <C.StatusCard>
                                <C.Spinner /> 불러오는 중…
                            </C.StatusCard>
                        </div>
                    ) : pageError ? (
                        <div
                            style={{
                                minHeight: "100dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                            }}
                        >
                            <C.ErrorCard>{pageError}</C.ErrorCard>
                        </div>
                    ) : (
                        <>
                            {/* ✅ 로딩 완료 후 전체 렌더 */}
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
                                    {currentUrl ? (
                                        <img
                                            src={currentUrl}
                                            alt={`wordcloud-${sentiment}`}
                                            style={{
                                                width: "80%",
                                                height: "80%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    ) : currentErr ? (
                                        <C.ErrorCard>{currentErr}</C.ErrorCard>
                                    ) : (
                                        // 이 케이스는 거의 없지만, 방어적으로
                                        <C.StatusCard>
                                            <C.Spinner /> 불러오는 중…
                                        </C.StatusCard>
                                    )}
                                </M.KeywordCloude>
                            </M.Keyword>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default MonthlyKeyword;
