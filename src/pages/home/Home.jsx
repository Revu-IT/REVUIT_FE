// pages/home/Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as H from "../../styles/HomeStyle";

import Header from "../../components/HeaderMain";
import TotalReview from "../../components/TotalReview";
import Graph from "../../components/Graph";
import ReportCard from "../../components/ReportCard";
import KeywordCard from "../../components/KeywordCard";
import more from "../../assets/images/chevron_right.svg";

import { companyMap } from "../../utils/companyMap";
import { toChartData } from "../../utils/transformStatistics";
import { getStatistics, getMainReport, getMainKeyword } from "../../axios/home";

function Home() {
    const navigate = useNavigate();

    // ── 페이지 단일 로딩/에러 ──────────────────────────
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    // 통계 (치명적)
    const [companyInfo, setCompanyInfo] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    // 리포트 (소프트)
    const [summaryData, setSummaryData] = useState(null);
    const [summaryMsg, setSummaryMsg] = useState(""); // 에러/안내 메시지

    // 키워드 (소프트)
    const [keywordData, setKeywordData] = useState({ data: [] });
    const [keywordMsg, setKeywordMsg] = useState(""); // 에러/안내 메시지

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                const [statsRes, reportRes, keywordRes] =
                    await Promise.allSettled([
                        getStatistics(),
                        getMainReport(),
                        getMainKeyword(),
                    ]);

                if (aborted) return;

                // ── 통계: 실패 시 페이지 에러 ──
                if (statsRes.status !== "fulfilled") {
                    throw statsRes.reason;
                } else {
                    const data = statsRes.value;
                    setCompanyInfo(companyMap[data.company_id] ?? null);
                    setTotalCount(data.review_count ?? 0);
                    setChartData(
                        toChartData(
                            data.my_company_monthly_avg,
                            data.industry_avg
                        )
                    );
                    setYear(data.year ?? new Date().getFullYear());
                }

                // ── 리포트: 소프트 에러는 메시지로 ──
                if (reportRes.status === "fulfilled") {
                    const d = reportRes.value;
                    setSummaryData({
                        positive: d?.positive ?? true,
                        summary: d?.summary ?? "",
                    });
                    setSummaryMsg("");
                } else {
                    const e = reportRes.reason;
                    if (e?.response?.status === 400) {
                        setSummaryMsg(
                            e?.response?.data?.detail ??
                                "최근 3개월 리뷰가 충분하지 않습니다."
                        );
                    } else {
                        setSummaryMsg("리포트를 불러오지 못했습니다.");
                    }
                }

                // ── 키워드: 소프트 에러는 메시지로 ──
                if (keywordRes.status === "fulfilled") {
                    setKeywordData(keywordRes.value ?? { data: [] });
                    setKeywordMsg("");
                } else {
                    const e = keywordRes.reason;
                    if (e?.response?.status === 400) {
                        setKeywordMsg(
                            e?.response?.data?.detail ||
                                "#최근 3개월 리뷰가 충분하지 않습니다."
                        );
                    } else {
                        setKeywordMsg("#키워드를 불러오지 못했습니다.");
                    }
                }
            } catch (e) {
                console.error(e);
                if (!aborted) setPageError("홈 데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setPageLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
    }, []);

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    {/* ✅ 페이지 전체 게이트: 로딩/에러 동안 헤더 포함 아무것도 렌더 안 함 */}
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
                                <C.Spinner /> 데이터 불러오는 중…
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
                            <Header />
                            <H.Home>
                                <TotalReview
                                    companyInfo={companyInfo}
                                    totalCount={totalCount}
                                />

                                <Graph
                                    title={`${year} 리뷰 평점 추이`}
                                    data={chartData}
                                    companyInfo={companyInfo}
                                />

                                <H.Monthly>
                                    <H.Title
                                        onClick={() =>
                                            navigate("/monthly/report")
                                        }
                                    >
                                        분기별 리포트 <H.More src={more} />
                                    </H.Title>
                                    {summaryMsg ? (
                                        <C.ErrorCard>{summaryMsg}</C.ErrorCard>
                                    ) : (
                                        <ReportCard
                                            companyInfo={companyInfo}
                                            positive={summaryData?.positive}
                                            summary={summaryData?.summary}
                                        />
                                    )}
                                </H.Monthly>

                                <H.Monthly style={{ marginBottom: "101px" }}>
                                    <H.Title
                                        onClick={() =>
                                            navigate("/monthly/keyword")
                                        }
                                    >
                                        분기별 키워드 <H.More src={more} />
                                    </H.Title>
                                    <KeywordCard
                                        companyInfo={companyInfo}
                                        keywords={
                                            Array.isArray(keywordData?.data)
                                                ? keywordData.data
                                                : keywordData
                                        }
                                        message={keywordMsg}
                                    />
                                </H.Monthly>
                            </H.Home>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default Home;
