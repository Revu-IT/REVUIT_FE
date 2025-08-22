import * as C from "../../styles/keyword/KeywordStrength";
import React, { useState, useEffect } from "react";
import api from "../../axios/instance";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";
import { companyMap } from "../../utils/companyMap";

function KeywordStrength() {
  const navigate = useNavigate();
  const sentiment = "positive"; 
  const [companyInfo, setCompanyInfo] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let aborted = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // 1) 회사 정보
        const response = await api.get("/main/statistics");
        if (aborted) return;
        const result = response.data;
        setCompanyId(result?.company_id ?? null);
        setCompanyInfo(companyMap[result?.company_id] ?? null);

        // 2) 키워드 리뷰 직접 호출
        const keywordRes = await api.get(`/analyze/keywords/${sentiment}`);
        if (aborted) return;

        // 서버 구조: { data: [...] }
        const keywordData = Array.isArray(keywordRes.data?.data) ? keywordRes.data.data : [];
        setKeywords(keywordData);

        console.log("키워드 리뷰 로딩 완료:", keywordData);

      } catch (err) {
        console.error(err);
        if (!aborted) setError("데이터를 불러오지 못했습니다.");
      } finally {
        if (!aborted) setLoading(false);
      }
    };

    fetchData();
    return () => { aborted = true; };
  }, [sentiment]);

  const handleList = (keyword) => {
  navigate(`/keyword/${companyInfo?.display}/detail?keyword=${encodeURIComponent(keyword)}&segment=${sentiment}`);
  };

  const handleNext = () => {
    navigate("../keyword/weakness");
  };

  return (
    <C.Page>
      <C.Center>
        <C.PageSpace>
          <Header Title="키워드별 분석" />

          <C.DetailContainer>
            <C.EmojiIcon>
              <img style={{ width: "150px" }} src="/src/assets/images/happy.svg" alt="happy emoji" />
            </C.EmojiIcon>

            <C.DetailTitle>
              이런 키워드가
              <br />
              <C.GreenText>강점</C.GreenText>이에요
            </C.DetailTitle>

            <C.StatContainer>
              <C.StatText>최근 평가와 함께 알려드려요</C.StatText>
            </C.StatContainer>

            {loading && <div style={{ textAlign: "center", padding: "20px" }}>데이터 로딩 중...</div>}
            {error && <div style={{ textAlign: "center", color: "red", padding: "20px" }}>{error}</div>}

            <C.ReviewList>
              {keywords.length > 0 ? (
                keywords.map((item, index) => (
                  <C.ReviewItem key={index}>
                    <C.ReviewHeader>
                      <C.KeywordTag>{item.keyword}</C.KeywordTag>
                    </C.ReviewHeader>
                    <C.ReviewContent>{item.latest_review}</C.ReviewContent>
                    <C.MoreButton onClick={() => handleList(item.keyword)}>
                      리뷰 보러 가기 →
                    </C.MoreButton>
                  </C.ReviewItem>
                ))
              ) : !loading && (
                <C.ReviewItem>
                  <div style={{ textAlign: "center", padding: "40px 20px", color: "#999", fontSize: "16px", lineHeight: "1.5" }}>
                    긍정적인 키워드 데이터가 없습니다.
                  </div>
                </C.ReviewItem>
              )}
            </C.ReviewList>

            <C.NextButton onClick={handleNext}>다음</C.NextButton>
          </C.DetailContainer>
        </C.PageSpace>
      </C.Center>
    </C.Page>
  );
}

export default KeywordStrength;
