import * as K from "../../styles/keyword/KeywordWeaknes";
import * as C from "../../styles/CommonStyle";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";
import sad from "../../assets/images/sad.svg";

function KeywordWeakness() {
    const navigate = useNavigate();
    const sentiment = "negative";
    const [companyInfo, setCompanyInfo] = useState(null);
    const [, setCompanyId] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api.get("/main/statistics");
                const result = response.data;
                console.log("API result:", result);

                setCompanyId(result?.company_id ?? null);
                setCompanyInfo(companyMap[result?.company_id] ?? null);

                const keywordsResponse = await api.get(
                    `/analyze/keywords/${sentiment}`
                );
                const keywordsData = keywordsResponse.data?.data ?? [];

                // 올바른 매핑: 실제 API 데이터 사용
                const mappedKeywords = keywordsData
                    .filter((k) => k.keyword && k.latest_review)
                    .map((k) => ({
                        keyword: k.keyword,
                        latest_review: k.latest_review,
                    }));

                console.log("키워드 객체 배열:", mappedKeywords);
                setKeywords(mappedKeywords);
                setError(null);
            } catch (e) {
                console.error("API 호출 에러:", e);
            }
        })();
    }, []);

    const handleList = (keyword) => {
        // 키워드를 파라미터로 전달
        navigate(`/keyword/${companyInfo?.display}/detail`, {
            state: {
                keyword: keyword,
                sentiment: sentiment, // "negative" 추가
            },
        });
    };
    const handleNext = () => {
        navigate("/home");
    };

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace bg="#f3f4f7">
                        <Header Title="키워드별 분석" />

                        <K.DetailContainer>
                            <K.EmojiIcon src={sad}></K.EmojiIcon>

                            <K.DetailTitle>
                                이런 키워드가
                                <br />
                                <K.YText>약점</K.YText>이에요
                            </K.DetailTitle>

                            <K.StatText>최근 평가와 함께 알려드려요</K.StatText>

                            <K.ReviewList>
                                {keywords.map((item, index) => (
                                    <K.ReviewItem key={index}>
                                        <K.KeywordTag
                                            style={{ color: "#F5BF28" }}
                                        >
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
                                ))}
                            </K.ReviewList>

                            <K.NextButton onClick={handleNext}>
                                메인으로
                            </K.NextButton>
                        </K.DetailContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default KeywordWeakness;
