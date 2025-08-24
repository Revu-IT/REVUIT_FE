import React, { useState, useEffect } from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/competitorLikeStyle";
import Header from "../../components/Header";
import { companyMap } from "../../utils/companyMap";

function CompetitorLike() {
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
            // 프록시 사용
            const response = await fetch(`/api/analyze/scores/ranking`);

            console.log("📡 Response status:", response.status, response.statusText);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: 데이터를 불러오는데 실패했습니다.`);
            }

            const result = await response.json();
            console.log("data 배열:", result.data);

            // API 데이터를 UI에 맞게 변환
            const formattedData = result.data
                .map((item) => {
                    const companyId = getCompanyIdByName(item.company_name);
                    const rating = (item.positive_average * 5).toFixed(2);

                    console.log(`${item.company_name} -> companyId: ${companyId}, rating: ${rating}`);

                    return {
                        rank: item.rank,
                        companyId: companyId,
                        companyName: item.company_name,
                        category: "플랫폼",
                        rating: rating,
                    };
                })
                .filter((item) => {
                    if (item.companyId === null) {
                        console.log(`❌ ${item.companyName}: companyMap에서 찾을 수 없음`);
                        return false;
                    }
                    return true;
                });

            console.log("최종 변환된 데이터:", formattedData);

            setRankings(formattedData);
            setError(null);
        } catch (err) {
            console.error("랭킹 데이터 로드 실패:", err);
            setError(err.message);
            setRankings([]);
        } finally {
            setLoading(false);
            console.log("API 호출 완료");
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
                                    <img src="/src/assets/images/happy.svg" alt="happy emoji" />
                                </L.LargeEmoji>
                            </L.EmojiSection>

                            <L.TitleSection>
                                <L.MainTitle>
                                    <L.GoodText>좋아요👍</L.GoodText>
                                    <L.ThumbsUp></L.ThumbsUp>
                                    가 많은 앱
                                    <br />
                                    top5
                                </L.MainTitle>
                                <L.TimeStamp>오늘 09:00 기준</L.TimeStamp>
                                <L.Description>경쟁사들과 '좋아요' 순위를 비교했어요</L.Description>
                                {error && <L.ErrorMessage>* {error}</L.ErrorMessage>}
                            </L.TitleSection>

                            <L.RankingList>
                                {rankings.map((item) => {
                                    const company = companyMap[item.companyId];
                                    if (!company) return null;

                                    return (
                                        <L.RankingItem key={item.rank}>
                                            <L.RankNumber rank={item.rank}>{item.rank}</L.RankNumber>
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

export default CompetitorLike;
