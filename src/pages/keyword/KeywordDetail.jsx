import React, { useState, useEffect } from "react";
//import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/keyword/KeywordDetail";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import api from "../../axios/instance"; // axios instance 추가

function KeywordDetail() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // 상태 관리
    const [keywordData, setKeywordData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL 파라미터 또는 state에서 keyword와 segment 가져오기
    const keyword = searchParams.get("keyword") || location.state?.keyword || "";
    const segment = searchParams.get("segment") || location.state?.segment || "";

    // 키워드가 없으면 에러 처리
    if (!keyword) {
        return (
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="키워드별 분석" />
                        <div style={{ textAlign: "center", padding: "50px 0" }}>
                            <p>키워드가 지정되지 않았습니다.</p>
                            <button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</button>
                        </div>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        );
    }

    // API 호출
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                setError(null);

                console.log("API 호출 - keyword:", keyword, "segment:", segment);

                // axios instance 사용
                const response = await api.get("/analyze/reviews-by-keyword", {
                    params: {
                        keyword: keyword,
                        segment: segment,
                    },
                });

                console.log("받은 데이터:", response.data);

                const data = response.data;

                // 응답 구조 검증
                if (!data || typeof data !== "object") {
                    throw new Error("잘못된 응답 구조입니다.");
                }

                // reviews 배열이 없으면 빈 배열로 초기화
                if (!data.reviews || !Array.isArray(data.reviews)) {
                    data.reviews = [];
                }

                // keyword와 segment가 없으면 요청 파라미터로 설정
                if (!data.keyword) data.keyword = keyword;
                if (!data.segment) data.segment = segment;

                setKeywordData(data);
            } catch (err) {
                console.error("API 호출 실패:", err);
                setError(err.response?.data?.message || err.message || "데이터를 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [keyword, segment]);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    // segment에 따른 라벨 결정
    const getSegmentLabel = (segment) => {
        return segment === "positive" ? "강점" : "약점";
    };

    // 로딩 상태 처리
    if (loading) {
        return (
            <D.Page>
                <D.Center>
                    <D.PageSpace>
                        <D.LoadingContainer>
                            <p>데이터를 불러오는 중...</p>
                        </D.LoadingContainer>
                    </D.PageSpace>
                </D.Center>
            </D.Page>
        );
    }

    return (
        <D.Page>
            <D.Center>
                <D.PageSpace>
                    <Header Title="키워드별 분석" />

                    {/* 키워드 타이틀 */}
                    <D.KeywordTitle>
                        <span
                            className="keyword-label"
                            style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: keywordData.segment === "positive" ? "#00c73c;" : "#F5BF28",
                            }}
                        >
                            {getSegmentLabel(keywordData.segment)}
                        </span>
                        <span className="keyword-divider">|</span>
                        <span className="keyword-name">{keywordData.keyword}</span>
                    </D.KeywordTitle>

                    {/* 리뷰 카드 리스트 */}
                    <D.EventList>
                        {keywordData.reviews.map((review, index) => (
                            <D.EventCard key={index}>
                                <D.EventText>{review.content}</D.EventText>
                                <D.EventFooter>
                                    <D.EventStats></D.EventStats>
                                    <D.EventDate>{formatDate(review.date)}</D.EventDate>
                                </D.EventFooter>
                            </D.EventCard>
                        ))}
                    </D.EventList>
                </D.PageSpace>
            </D.Center>
        </D.Page>
    );
}

export default KeywordDetail;
