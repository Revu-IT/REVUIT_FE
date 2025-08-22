import * as C from "../../styles/keyword/KeywordStyle";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";

function Keyword() {
    const navigate = useNavigate();
    const [companyInfo, setCompanyInfo] = useState(null);
    const [companyId, setCompanyId] = useState(null);
    const [data, setData] = useState(null);
    
    // 키워드 관련 state 추가
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const goToKeywordConfirm = () => {
        navigate(`/keyword/strength`);
    };

    useEffect(() => {
        let aborted = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // 1) 회사 정보 가져오기
                const response = await api.get("/main/statistics");
                if (aborted) return;
                
                const result = response.data;
                console.log("API result:", result);
                setCompanyInfo(companyMap[result?.company_id] ?? null);

                // 2) 키워드 데이터 가져오기 (positive 키워드만)
                const keywordRes = await api.get("/analyze/keywords/positive");
                if (aborted) return;

                const keywordData = Array.isArray(keywordRes.data?.data) ? keywordRes.data.data : [];
                setKeywords(keywordData);
                console.log("키워드 데이터:", keywordData);

            } catch (e) {
                console.error(e);
                if (!aborted) setError("데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setLoading(false);
            }
        };

        fetchData();
        return () => { aborted = true; };
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
                                    ) : (
                                        "불러오는 중..."
                                    )}
                                </C.MainTitle>

                                <C.Subtitle>
                                    AI가 {keywords.length > 0 ? `${keywords.length}개의` : ""} 키워드를 분석했어요
                                </C.Subtitle>
                            </C.TitleSection>

                            <C.KeywordGrid>
                                {loading ? (
                                    // 로딩 중일 때 placeholder
                                    Array.from({ length: 9 }).map((_, index) => (
                                        <C.KeywordItem key={index}>
                                            <div style={{ background: '#f0f0f0', borderRadius: '4px', height: '20px', animation: 'pulse 1.5s infinite' }}>
                                                로딩중...
                                            </div>
                                        </C.KeywordItem>
                                    ))
                                ) : error ? (
                                    <C.KeywordItem>
                                        <div style={{ color: '#f44336', textAlign: 'center' }}>
                                            키워드를 불러올 수 없습니다
                                        </div>
                                    </C.KeywordItem>
                                ) : keywords.length > 0 ? (
                                    // 실제 키워드 데이터 (최대 5개만 표시)
                                    keywords.slice(0, 9).map((item, index) => (
                                        <C.KeywordItem key={index}>
                                            {item.keyword}
                                        </C.KeywordItem>
                                    ))
                                ) : (
                                    <C.KeywordItem>
                                        <div style={{ color: '#999', textAlign: 'center' }}>
                                            키워드가 없습니다
                                        </div>
                                    </C.KeywordItem>
                                )}
                            </C.KeywordGrid>

                            <C.AnalyzeButton onClick={goToKeywordConfirm}>
                                키워드 확인하러 가기
                            </C.AnalyzeButton>
                        </C.ContentContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Keyword;