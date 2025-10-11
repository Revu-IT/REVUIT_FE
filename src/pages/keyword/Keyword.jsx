import * as C from "../../styles/keyword/KeywordStyle";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";
import React, { useEffect, useState, useTransition } from "react";

function Keyword() {
    const navigate = useNavigate();

    const [companyInfo, setCompanyInfo] = useState(null);
    const [companyId, setCompanyId] = useState(null); // 기존 유지
    const [data, setData] = useState(null); // 기존 유지

    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true); // 캐시가 있으면 즉시 false
    const [error, setError] = useState(null);
    const [isPending, startTransition] = useTransition(); // 부드러운 갱신

    const goToKeywordConfirm = () => {
        navigate(`/keyword/strength`);
    };

    // ── 캐시 키
    const CACHE_KEYS = {
        stats: "revuit_stats_company",
        posKeywords: "revuit_keywords_positive",
    };

    // ── 안전한 캐시 유틸
    const readCache = (key, fallback = null) => {
        try {
            const raw = sessionStorage.getItem(key);
            if (!raw) return fallback;
            return JSON.parse(raw);
        } catch {
            return fallback;
        }
    };
    const writeCache = (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch {
            // storage quota 등은 조용히 무시
        }
    };

    useEffect(() => {
        let aborted = false;

        // 0) 캐시 즉시 반영 → 체감 로딩 줄이기
        const cachedStats = readCache(CACHE_KEYS.stats);
        const cachedKeywords = readCache(CACHE_KEYS.posKeywords, []);
        if (cachedStats) {
            const mapped = companyMap[cachedStats.company_id] ?? null;
            setCompanyInfo(mapped);
        }
        if (Array.isArray(cachedKeywords) && cachedKeywords.length > 0) {
            setKeywords(cachedKeywords);
        }

        // 캐시가 하나라도 있으면 일단 로딩 해제 (바로 UI 표시)
        if (cachedStats || (cachedKeywords && cachedKeywords.length > 0)) {
            setLoading(false);
        }

        // 1) 네트워크 동시 요청 (SWR: stale-while-revalidate)
        const fetchFresh = async () => {
            setError(null);
            try {
                // 캐시가 없던 경우에만 로딩 스피너 노출
                if (!cachedStats && (!cachedKeywords || cachedKeywords.length === 0)) {
                    setLoading(true);
                }

                const [statsRes, kwRes] = await Promise.allSettled([
                    api.get("/main/statistics"),
                    api.get("/analyze/keywords/positive"),
                ]);

                if (aborted) return;

                // 회사 정보 처리
                if (statsRes.status === "fulfilled") {
                    const result = statsRes.value?.data;
                    writeCache(CACHE_KEYS.stats, result);
                    const mapped = companyMap[result?.company_id] ?? null;
                    // 렌더 끊김 최소화를 위해 transition으로 반영
                    startTransition(() => setCompanyInfo(mapped));
                } else if (!cachedStats) {
                    // 캐시도 없고 네트워크도 실패
                    setError("회사 정보를 불러오지 못했습니다.");
                }

                // 키워드 처리
                if (kwRes.status === "fulfilled") {
                    const arr = Array.isArray(kwRes.value?.data?.data) ? kwRes.value.data.data : [];
                    writeCache(CACHE_KEYS.posKeywords, arr);
                    startTransition(() => setKeywords(arr));
                } else if (!cachedKeywords || cachedKeywords.length === 0) {
                    setError((prev) => prev ?? "키워드를 불러오지 못했습니다.");
                }
            } catch (e) {
                if (!aborted) setError("데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setLoading(false);
            }
        };

        fetchFresh();

        return () => {
            aborted = true;
        };
    }, []);

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />

                        <C.ContentContainer>
                            <C.HashIcon>
                                <img src="../src/assets/images/keyword_tag.svg" alt="keyword tag" />
                            </C.HashIcon>

                            <C.TitleSection>
                                <C.MainTitle>
                                    {companyInfo ? (
                                        <>
                                            {companyInfo.display}의 평점을
                                            <br />
                                            <C.BlueText>키워드</C.BlueText>로 확인해보세요
                                        </>
                                    ) : loading ? (
                                        "불러오는 중..."
                                    ) : (
                                        "회사 정보를 확인할 수 없습니다"
                                    )}
                                </C.MainTitle>

                                <C.Subtitle>
                                    AI가 {keywords && keywords.length > 0 ? `${keywords.length}개의` : ""} 키워드를
                                    분석했어요
                                </C.Subtitle>
                            </C.TitleSection>

                            <C.KeywordGrid>
                                {loading ? (
                                    // 로딩 시에도 9칸 고정 → 레이아웃 점프 최소화
                                    Array.from({ length: 9 }).map((_, index) => (
                                        <C.KeywordItem key={index}>
                                            <div
                                                style={{
                                                    background: "#f0f0f0",
                                                    borderRadius: "4px",
                                                    height: "20px",
                                                    animation: "pulse 1.5s infinite",
                                                }}
                                            >
                                                로딩중...
                                            </div>
                                        </C.KeywordItem>
                                    ))
                                ) : error && (!keywords || keywords.length === 0) ? (
                                    <C.KeywordItem>
                                        <div style={{ color: "#f44336", textAlign: "center" }}>
                                            키워드를 불러올 수 없습니다
                                        </div>
                                    </C.KeywordItem>
                                ) : keywords && keywords.length > 0 ? (
                                    keywords
                                        .slice(0, 9)
                                        .map((item, index) => <C.KeywordItem key={index}>{item.keyword}</C.KeywordItem>)
                                ) : (
                                    <C.KeywordItem>
                                        <div style={{ color: "#999", textAlign: "center" }}>키워드가 없습니다</div>
                                    </C.KeywordItem>
                                )}
                            </C.KeywordGrid>

                            <C.AnalyzeButton onClick={goToKeywordConfirm}>키워드 확인하러 가기</C.AnalyzeButton>
                        </C.ContentContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Keyword;
