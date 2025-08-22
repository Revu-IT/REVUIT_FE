import * as C from "../../styles/keyword/KeywordStrength";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";

function KeywordWeakness() {
    const navigate = useNavigate();
    const sentiment = "negative";
    const [companyInfo, setCompanyInfo] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [data, setData] = useState(null);        
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    

      useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const response = await api.get("/main/statistics");
                const result = response.data;
                console.log("API result:", result);

                setCompanyId(result?.company_id ?? null);
                setCompanyInfo(companyMap[result?.company_id] ?? null);

                const keywordsResponse = await api.get(`/analyze/keywords/${sentiment}`);
                const keywordsData = keywordsResponse.data?.data ?? [];

                // 올바른 매핑: 실제 API 데이터 사용
               const mappedKeywords = keywordsData
   .filter(k => k.keyword && k.latest_review)
   .map((k) => ({
       keyword: k.keyword,
       latest_review: k.latest_review
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
            state: { keyword: keyword } 
        });
    };
    const handleNext = () => {
        navigate("/home");
    };
    
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="키워드별 분석" />
                        
                        <C.DetailContainer>
                            <C.EmojiIcon>
                                <img style={{
                            width:"150px"
                        }} src="..\src\assets\images\sad.svg"/>
                            </C.EmojiIcon>

                            <C.DetailTitle>
                                이런 키워드가
                                <br />
                                <C.GreenText>약점</C.GreenText>이에요
                            </C.DetailTitle>

                            <C.StatContainer>
                                <C.StatText>최근 평가와 함께 알려드려요</C.StatText>
                            </C.StatContainer>

                             <C.ReviewList>
                                    {keywords.map((item, index) => (
                                        <C.ReviewItem key={index}>
                                            <C.ReviewHeader>
                                                <C.KeywordTag>{item.keyword}</C.KeywordTag>
                                            </C.ReviewHeader>
                                            <C.ReviewContent>
                                                {item.latest_review}
                                            </C.ReviewContent>
                                            <C.MoreButton onClick={() => handleList(item.keyword)}>
                                                리뷰 보러 가기 →
                                            </C.MoreButton>
                                        </C.ReviewItem>
                                    ))}
                            
                            </C.ReviewList>

                            <C.NextButton onClick={handleNext}>
                                메인으로
                            </C.NextButton>
                        </C.DetailContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default KeywordWeakness;