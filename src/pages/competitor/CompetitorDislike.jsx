import React, { useState, useEffect } from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/competitorLikeStyle";
import Header from "../../components/Header";
import { companyMap } from "../../utils/companyMap";

function CompetitorDislike() {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // company_name을 companyId로 매핑하는 함수
    const getCompanyIdByName = (companyName) => {
        for (const [id, company] of Object.entries(companyMap)) {
            if (company.name === companyName) {
                return parseInt(id);
            }
        }
        return null;
    };

    const fetchRankings = async () => {
        try {
            setLoading(true);
            console.log("🚀 싫어요 API 호출 시작: /api/analyze/scores/ranking");

            // 프록시 사용 (동일한 API 사용, 정렬만 다르게)
            const response = await fetch(`/api/analyze/scores/ranking`);

            console.log("📡 Response status:", response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: 데이터를 불러오는데 실패했습니다.`);
            }

            const result = await response.json();
            console.log("📄 받아온 원본 데이터:", result);

            // API 데이터를 UI에 맞게 변환 (negative_average 기준으로 정렬)
            const formattedData = result.data
                .map((item) => {
                    const companyId = getCompanyIdByName(item.company_name);
                    // negative 점수를 계산 (1 - positive_average)
                    const negativeScore = 1 - item.positive_average;
                    const rating = (negativeScore * 5).toFixed(2);

                    console.log(`🏢 ${item.company_name} -> negative: ${negativeScore.toFixed(2)}, rating: ${rating}`);

                    return {
                        rank: item.rank,
                        companyId: companyId,
                        companyName: item.company_name,
                        category: "플랫폼",
                        rating: rating,
                        negativeScore: negativeScore,
                    };
                })
                .filter((item) => item.companyId !== null)
                .sort((a, b) => b.negativeScore - a.negativeScore) // negative 점수 높은 순으로 정렬
                .map((item, index) => ({ ...item, rank: index + 1 })); // 순위 재조정

            console.log("✅ 최종 변환된 싫어요 데이터:", formattedData);

            setRankings(formattedData);
            setError(null);
        } catch (err) {
            console.error("❌ 싫어요 랭킹 데이터 로드 실패:", err);
            setError(err.message);
            setRankings([]);
        } finally {
            setLoading(false);
            console.log("🏁 싫어요 API 호출 완료");
        }
    };

    useEffect(() => {
        fetchRankings();
    }, []);

    if (loading) {
        return (
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="경쟁사 분석" />
                        <L.LoadingContainer>
                            <L.LoadingText>데이터를 불러오는 중...</L.LoadingText>
                        </L.LoadingContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        );
    }

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="경쟁사 분석" />

                        <L.CompetitorContainer>
                            <L.EmojiSection>
                                <L.LargeEmoji>
                                    <img src="/src/assets/images/sad.svg" />
                                </L.LargeEmoji>
                            </L.EmojiSection>

                            <L.TitleSection>
                                <L.MainTitle>
                                    <L.BadText>싫어요👍</L.BadText>
                                    <L.ThumbsUp></L.ThumbsUp>
                                    가 많은 앱
                                    <br />
                                    top5
                                </L.MainTitle>
                                <L.TimeStamp>오늘 09:00 기준</L.TimeStamp>
                                <L.Description>경쟁사들과 '싫어요' 순위를 비교했어요</L.Description>
                                {error && <L.ErrorMessage>* {error}</L.ErrorMessage>}
                            </L.TitleSection>

                            <L.RankingList>
                                {rankings.map((item) => {
                                    const company = companyMap[item.companyId];
                                    if (!company) return null;

                                    return (
                                        <L.RankingItem key={item.rank}>
                                            <L.RankNumberBad rank={item.rank}>{item.rank}</L.RankNumberBad>
                                            <L.CompanyInfo>
                                                <L.CompanyLogo>
                                                    <img src={company.logo} alt={company.display} />
                                                </L.CompanyLogo>
                                                <L.CompanyDetails>
                                                    <L.CompanyName>{company.display}</L.CompanyName>
                                                    <L.CompanyCategory>{item.category}</L.CompanyCategory>
                                                </L.CompanyDetails>
                                            </L.CompanyInfo>
                                            <L.Rating>{item.rating}</L.Rating>
                                        </L.RankingItem>
                                    );
                                })}
                            </L.RankingList>
                        </L.CompetitorContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default CompetitorDislike;
