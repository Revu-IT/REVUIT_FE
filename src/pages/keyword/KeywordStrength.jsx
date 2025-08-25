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
    const [companyInfo, setCompanyInfo] = useState(null);
    const [, setCompanyId] = useState(null);
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
                const keywordRes = await api.get(
                    `/analyze/keywords/${sentiment}`
                );
                if (aborted) return;

                // 서버 구조: { data: [...] }
                const keywordData = Array.isArray(keywordRes.data?.data)
                    ? keywordRes.data.data
                    : [];
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
        navigate("../keyword/weakness");
    };

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace bg="#f3f4f7">
                    <Header Title="키워드별 분석" />
                    <K.DetailContainer>
                        <K.EmojiIcon src={Happy}></K.EmojiIcon>
                        <K.DetailTitle>
                            이런 키워드가
                            <br />
                            <K.GreenText>강점</K.GreenText>이에요
                        </K.DetailTitle>

                        <K.StatText>최근 평가와 함께 알려드려요</K.StatText>

                        {loading && (
                            <div
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                데이터 로딩 중...
                            </div>
                        )}
                        {error && (
                            <div
                                style={{
                                    textAlign: "center",
                                    color: "red",
                                    padding: "20px",
                                }}
                            >
                                {error}
                            </div>
                        )}

                        <K.ReviewList>
                            {keywords.length > 0
                                ? keywords.map((item, index) => (
                                      <K.ReviewItem key={index}>
                                          <K.ReviewHeader>
                                              <K.KeywordTag>
                                                  {item.keyword}
                                              </K.KeywordTag>
                                          </K.ReviewHeader>
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
                                : !loading && (
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
                                              긍정적인 키워드 데이터가 없습니다.
                                          </div>
                                      </K.ReviewItem>
                                  )}
                        </K.ReviewList>

                        <K.NextButton onClick={handleNext}>다음</K.NextButton>
                    </K.DetailContainer>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default KeywordStrength;
