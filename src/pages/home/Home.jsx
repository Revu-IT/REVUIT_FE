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
import { getStatistics, getMainReport } from "../../axios/home";

function Home() {
    const navigate = useNavigate();

    // 통계
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    // 리포트
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [summaryError, setSummaryError] = useState("");
    const [summaryData, setSummaryData] = useState(null);

    // 통계 불러오기
    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getStatistics();

                setCompanyInfo(companyMap[data.company_id] ?? null);
                setTotalCount(data.review_count ?? 0);
                setChartData(
                    toChartData(data.my_company_monthly_avg, data.industry_avg)
                );
                setYear(data.year ?? new Date().getFullYear());
            } catch (e) {
                console.error(e);
                setError("통계를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // 분기별 리포트 불러오기
    useEffect(() => {
        (async () => {
            try {
                setSummaryLoading(true);
                setSummaryError("");

                const data = await getMainReport();
                setSummaryData({
                    positive: data?.positive ?? true,
                    summary: data?.summary ?? "",
                });
            } catch (e) {
                console.error(e);
                if (e?.response?.status === 400) {
                    setSummaryError(
                        e?.response?.data?.detail ??
                            "최근 3개월 리뷰가 충분하지 않습니다."
                    );
                } else {
                    setSummaryError("리포트를 불러오지 못했습니다.");
                }
            } finally {
                setSummaryLoading(false);
            }
        })();
    }, []);

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    <Header />
                    <H.Home>
                        <TotalReview
                            companyInfo={companyInfo}
                            totalCount={totalCount}
                        />

                        {loading ? (
                            <C.StatusCard>
                                <C.Spinner />
                                데이터 불러오는 중…
                            </C.StatusCard>
                        ) : error ? (
                            <C.ErrorCard>{error}</C.ErrorCard>
                        ) : (
                            <Graph
                                title={`${year} 리뷰 평점 추이`}
                                data={chartData}
                                companyInfo={companyInfo}
                            />
                        )}

                        <H.Monthly>
                            <H.Title
                                onClick={() => navigate("/monthly/report")}
                            >
                                분기별 리포트 <H.More src={more} />
                            </H.Title>

                            {summaryLoading ? (
                                <C.StatusCard>
                                    <C.Spinner /> 리포트 불러오는 중…
                                </C.StatusCard>
                            ) : summaryError ? (
                                <C.ErrorCard>{summaryError}</C.ErrorCard>
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
                                onClick={() => navigate("/monthly/keyword")}
                            >
                                분기별 키워드 <H.More src={more} />
                            </H.Title>
                            <KeywordCard companyInfo={companyInfo} />
                        </H.Monthly>
                    </H.Home>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default Home;
