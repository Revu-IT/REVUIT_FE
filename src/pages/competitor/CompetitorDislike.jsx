// pages/competitor/CompetitorDislike.jsx
import React, { useState, useEffect } from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/CompetitorLikeStyles";
import Header from "../../components/Header";
import { companyMap } from "../../utils/companyMap";
import Sad from "../../assets/images/sad.svg";

function CompetitorDislike() {
    const [rankings, setRankings] = useState([]);

    // ✅ 페이지 단일 게이트
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    const getCompanyIdByName = (companyName) => {
        for (const [id, company] of Object.entries(companyMap)) {
            if (company.name === companyName) return parseInt(id, 10);
        }
        return null;
    };

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                const response = await fetch(`/api/analyze/scores/ranking`);
                if (!response.ok) {
                    throw new Error(
                        `HTTP ${response.status}: 데이터를 불러오는데 실패했습니다.`
                    );
                }

                const result = await response.json();

                const formatted = result.data
                    .map((item) => {
                        const companyId = getCompanyIdByName(item.company_name);
                        const negativeScore = 1 - item.positive_average;
                        const rating = (negativeScore * 5).toFixed(2);
                        return {
                            rank: item.rank,
                            companyId,
                            companyName: item.company_name,
                            category: "플랫폼",
                            rating,
                            negativeScore,
                        };
                    })
                    .filter((item) => item.companyId !== null)
                    .sort((a, b) => b.negativeScore - a.negativeScore)
                    .slice(0, 5) // 👈 텍스트에 맞춰 top5만 노출 (필요 없으면 제거)
                    .map((item, index) => ({ ...item, rank: index + 1 }));

                if (aborted) return;
                setRankings(formatted);
            } catch (err) {
                console.error("❌ 싫어요 랭킹 데이터 로드 실패:", err);
                if (!aborted) {
                    setPageError(
                        err?.message || "데이터를 불러오지 못했습니다."
                    );
                    setRankings([]);
                }
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
                            <C.FixedHeaderWrapper>
                                <Header Title="경쟁사 분석" />
                            </C.FixedHeaderWrapper>

                            <L.Like>
                                <L.Emoji>
                                    <L.EmojiImg src={Sad} />
                                </L.Emoji>

                                <L.Container>
                                    <L.Title>
                                        <span style={{ color: "#F5BF28" }}>
                                            싫어요👎{" "}
                                        </span>
                                        가 많은 앱<br />
                                        top 5
                                    </L.Title>
                                    <L.Date>오늘 09:00 기준</L.Date>
                                    <L.Subtitle>
                                        경쟁사들과 ’싫어요’순위를 비교했어요.
                                    </L.Subtitle>
                                </L.Container>

                                <L.Line />

                                <L.RankingList>
                                    {rankings.map((item) => {
                                        const company =
                                            companyMap[item.companyId];
                                        if (!company) return null;
                                        return (
                                            <L.RankingItem key={item.rank}>
                                                <L.RankNumberBad
                                                    rank={item.rank}
                                                >
                                                    {item.rank}
                                                </L.RankNumberBad>
                                                <L.CompanyInfo>
                                                    <L.CompanyLogo>
                                                        <img
                                                            src={company.logo}
                                                            alt={
                                                                company.display
                                                            }
                                                        />
                                                    </L.CompanyLogo>
                                                    <L.CompanyDetails>
                                                        <L.CompanyName>
                                                            {company.display}
                                                        </L.CompanyName>
                                                        <L.CompanyCategory>
                                                            {item.category}
                                                        </L.CompanyCategory>
                                                    </L.CompanyDetails>
                                                </L.CompanyInfo>
                                                <L.Rating>
                                                    {item.rating}
                                                </L.Rating>
                                            </L.RankingItem>
                                        );
                                    })}
                                </L.RankingList>
                            </L.Like>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default CompetitorDislike;
