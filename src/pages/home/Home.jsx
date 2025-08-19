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

import api from "../../axios/instance";
import { companyMap } from "../../utils/companyMap";
import { toChartData } from "../../utils/transformStatistics";

function Home() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/main/statistics");

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
                            {/* <ReportCard sentiment={MOCK_SENTIMENT} companyInfo={companyInfo}/> */}
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
