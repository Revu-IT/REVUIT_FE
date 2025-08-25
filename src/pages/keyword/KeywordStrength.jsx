// pages/keyword/KeywordStrength.jsx
import * as K from "../../styles/keyword/KeywordStrength";
import * as C from "../../styles/CommonStyle";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";
import Happy from "../../assets/images/happy.svg";

function KeywordStrength() {
    const navigate = useNavigate();
    const sentiment = "positive";

    // 페이지 단일 상태
    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    // 데이터
    const [companyInfo, setCompanyInfo] = useState(null);
    const [, setCompanyId] = useState(null);
    const [keywords, setKeywords] = useState([]);

    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                // ✅ 통계 + 키워드 동시 로딩
                const [statsRes, keywordsRes] = await Promise.all([
                    api.get("/main/statistics"),
                    api.get(`/analyze/keywords/${sentiment}`),
                ]);
                if (aborted) return;

                const stats = statsRes.data;
                setCompanyId(stats?.company_id ?? null);
                setCompanyInfo(companyMap[stats?.company_id] ?? null);

                const list = Array.isArray(keywordsRes.data?.data)
                    ? keywordsRes.data.data
                    : [];
                setKeywords(list);
            } catch (err) {
                console.error(err);
                if (!aborted) setPageError("데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setPageLoading(false);
            }
        })();
        return () => {
            aborted = true;
        };
    }, [sentiment]);

    const handleList = (keyword) => {
        navigate(
            `/keyword/${
                companyInfo?.display
            }/detail?keyword=${encodeURIComponent(
                keyword
            )}&segment=${sentiment}`
        );
    };

    const handleNext = () => {
        navigate("/keyword/weakness");
    };

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace bg="#f3f4f7">
                    {/* ✅ 페이지 전체 게이트(헤더 포함) */}
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
                                <C.Spinner /> 데이터 로딩 중…
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
                            <Header Title="키워드별 분석" />
                            <K.DetailContainer>
                                <K.EmojiIcon src={Happy} />
                                <K.DetailTitle>
                                    이런 키워드가
                                    <br />
                                    <K.GreenText>강점</K.GreenText>이에요
                                </K.DetailTitle>

                                <K.StatText>
                                    최근 평가와 함께 알려드려요
                                </K.StatText>

                                <K.ReviewList>
                                    {keywords.length > 0 ? (
                                        keywords.map((item, index) => (
                                            <K.ReviewItem
                                                key={`${item.keyword}-${index}`}
                                            >
                                                <K.KeywordTag>
                                                    {item.keyword}
                                                </K.KeywordTag>
                                                <K.ReviewContent>
                                                    {item.latest_review}
                                                </K.ReviewContent>
                                                <K.MoreButton
                                                    onClick={() =>
                                                        handleList(item.keyword)
                                                    }
                                                >
                                                    리뷰 보러 가기 →
                                                </K.MoreButton>
                                            </K.ReviewItem>
                                        ))
                                    ) : (
                                        <K.ReviewItem>
                                            <div
                                                style={{
                                                    textAlign: "center",
                                                    padding: "40px 20px",
                                                    color: "#999",
                                                    fontSize: "16px",
                                                    lineHeight: "1.5",
                                                }}
                                            >
                                                긍정적인 키워드 데이터가
                                                없습니다.
                                            </div>
                                        </K.ReviewItem>
                                    )}
                                </K.ReviewList>

                                <K.NextButton onClick={handleNext}>
                                    다음
                                </K.NextButton>
                            </K.DetailContainer>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default KeywordStrength;
