import * as C from "../../styles/keyword/KeywordStyle";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";
import MovingKeywords from "../../components/MovingKeywords"; // ✅ 추가

function Keyword() {
    const navigate = useNavigate();
    const [companyInfo, setCompanyInfo] = useState(null);

    const [keywords, setKeywords] = useState([]);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    const goToKeywordConfirm = () => {
        navigate(`/keyword/strength`);
    };

    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                setLoading(true);
                setError(null);

                // 1) 회사 정보
                const response = await api.get("/main/statistics");
                if (aborted) return;
                const result = response.data;
                setCompanyInfo(companyMap[result?.company_id] ?? null);

                // 2) 키워드 (positive)
                const keywordRes = await api.get("/analyze/keywords/positive");
                if (aborted) return;
                const keywordData = Array.isArray(keywordRes.data?.data)
                    ? keywordRes.data.data
                    : [];
                setKeywords(keywordData);
            } catch (e) {
                console.error(e);
                if (!aborted) setError("데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setLoading(false);
            }
        })();
        return () => {
            aborted = true;
        };
    }, []);

    const words = keywords.map((k) => k.keyword);

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    <Header />

                    <C.ContentContainer>
                        <C.HashIcon>
                            <img
                                src="../src/assets/images/keyword_tag.svg"
                                alt="keyword tag"
                            />
                        </C.HashIcon>

                        <C.TitleSection>
                            <C.MainTitle>
                                {companyInfo ? (
                                    <>
                                        {companyInfo.display}의 평점을
                                        <br />
                                        <C.BlueText>키워드</C.BlueText>로
                                        확인해보세요
                                    </>
                                ) : (
                                    "불러오는 중..."
                                )}
                            </C.MainTitle>
                            <C.Subtitle>
                                AI가{" "}
                                {words.length > 0 ? `${words.length}개의` : ""}{" "}
                                키워드를 분석했어요
                            </C.Subtitle>
                        </C.TitleSection>

                        <MovingKeywords
                            words={keywords.map((k) => k.keyword)}
                            count={12}
                            height={220}
                            lanes={6} // 높이에 따라 5~7 권장
                            duration={12} // 전체 속도 동일
                            gapVW={32} // 키워드가 길면 34~38로 ↑
                            approxTagH={36}
                        />
                        <C.AnalyzeButton onClick={goToKeywordConfirm}>
                            키워드 확인하러 가기
                        </C.AnalyzeButton>
                    </C.ContentContainer>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default Keyword;
