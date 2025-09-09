// pages/competitor/CompetitorLike.jsx
import React, { useState, useEffect } from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/CompetitorLikeStyles";
import Header from "../../components/Header";
import { companyMap } from "../../utils/companyMap";
import Happy from "../../assets/images/happy.svg";
import api from "../../axios/instance"; // ✅ axios 인스턴스 사용 (프록시/베이스URL 일관)

function CompetitorLike() {
    const [rankings, setRankings] = useState([]);

    // ✅ 페이지 단일 게이트
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    // ✅ 이름 정규화 + 빠른 매핑 인덱스
    const normalize = (s) => (s || "").toString().trim().toLowerCase().replace(/\s+/g, "");
    const nameIndex = React.useMemo(() => {
        const idx = {};
        Object.entries(companyMap).forEach(([id, c]) => {
            idx[normalize(c.name)] = Number(id);
            idx[normalize(c.display)] = Number(id); // display로도 매칭
        });
        return idx;
    }, []);

    const getCompanyIdByName = (companyName) => nameIndex[normalize(companyName)] ?? null;

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                // ✅ fetch 대신 axios 인스턴스 (개발/배포 모두 안정)
                const res = await api.get("/analyze/scores/ranking");

                // ✅ 응답 형태 방어: {data: [...]} 또는 [...] 모두 허용
                const rows = Array.isArray(res.data?.data) ? res.data.data : Array.isArray(res.data) ? res.data : [];

                if (!rows.length) {
                    throw new Error("랭킹 데이터가 비어 있습니다.");
                }

                const formatted = rows
                    .map((item) => {
                        const companyId = getCompanyIdByName(item.company_name);
                        const positiveAvg = Number(item.positive_average) || 0;
                        return {
                            rank: item.rank,
                            companyId,
                            companyName: item.company_name,
                            category: "플랫폼",
                            rating: (positiveAvg * 5).toFixed(2),
                            positiveAvg,
                        };
                    })
                    // ✅ 매칭 실패한 항목 추적 (디버깅용 로그)
                    .filter((x) => {
                        if (x.companyId === null) {
                            console.warn(`[매칭 실패] company_name='${x.companyName}' → companyMap에 없음`);
                            return false;
                        }
                        return true;
                    })
                    .sort((a, b) => b.positiveAvg - a.positiveAvg)
                    .slice(0, 5)
                    .map((x, i) => ({ ...x, rank: i + 1 }));

                if (aborted) return;

                if (!formatted.length) {
                    // 매칭 실패로 모두 걸러졌을 가능성
                    throw new Error("표시 가능한 랭킹 데이터가 없습니다. (회사명 매칭 실패)");
                }

                setRankings(formatted);
            } catch (err) {
                console.error("랭킹 데이터 로드 실패:", err);
                if (!aborted) {
                    setPageError(err?.message || "데이터를 불러오지 못했습니다.");
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
                    {/* ✅ 페이지 전체 게이트 */}
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
                            <C.FixedHeaderWrapper>
                                <Header Title="경쟁사 분석" />
                            </C.FixedHeaderWrapper>

                            <L.Like>
                                <L.Emoji>
                                    <L.EmojiImg src={Happy} />
                                </L.Emoji>

                                <L.Container>
                                    <L.Title>
                                        <span>좋아요👍 </span>가 많은 앱<br />
                                        top 5
                                    </L.Title>
                                    <L.Date>오늘 09:00 기준</L.Date>
                                    <L.Subtitle>경쟁사들과 ’좋아요’순위를 비교했어요.</L.Subtitle>
                                </L.Container>

                                <L.Line />

                                {/* ✅ 빈 배열 대비 안내 */}
                                {!rankings.length ? (
                                    <C.ErrorCard>표시할 랭킹이 없습니다.</C.ErrorCard>
                                ) : (
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
                                )}
                            </L.Like>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default CompetitorLike;
