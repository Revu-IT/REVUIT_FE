import * as C from "../../styles/keyword/KeywordStrength";
import React, { useState } from "react";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";

function KeywordStrength() {
    const navigate = useNavigate();
    const handleNext = () => {
        navigate("../keyword/weakness");
    };
    const handleList = () => {
        navigate("../keyword/detail");
    };
    // 샘플 키워드 데이터
    const keywordReviews = [
        {
            id: 1,
            keyword: "이벤트",
            content: "1"
        },
        {
            id: 2,
            keyword: "이벤트",
            content: "2"
        },
        {
            id: 3,
            keyword: "이벤트",
            content: "3"
        }
    ];

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
                        }} src="..\src\assets\images\happy.svg"/>
                            </C.EmojiIcon>

                            <C.DetailTitle>
                                이런 키워드가
                                <br />
                                <C.GreenText>강점</C.GreenText>이에요
                            </C.DetailTitle>

                            <C.StatContainer>
                                <C.StatText>최근 평가와 함께 알려드려요</C.StatText>
                            </C.StatContainer>

                            <C.ReviewList>
                                {keywordReviews.map((review) => (
                                    <C.ReviewItem key={review.id}>
                                        <C.ReviewHeader>
                                            <C.KeywordTag>{review.keyword}</C.KeywordTag>
                                        </C.ReviewHeader>
                                        <C.ReviewContent>
                                            {review.content}
                                        </C.ReviewContent>
                                                                                    <C.MoreButton  onClick={handleList}>리뷰 보러 가기 →</C.MoreButton>

                                    </C.ReviewItem>
                                ))}
                            </C.ReviewList>

                            <C.NextButton onClick={handleNext}>
                                다음
                            </C.NextButton>
                        </C.DetailContainer>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default KeywordStrength;