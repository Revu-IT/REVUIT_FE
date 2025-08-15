import React from "react";
import * as C from "../../styles/keyword/KeywordStyle";

import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";

function Keyword() {
    const navigate = useNavigate();

    const goToKeywordConfirm = () => {
        navigate("/keywordDetail");
    };

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        
                        <C.ContentContainer>
                            <C.HashIcon>
                                <img src="..\src\assets\images\keyword_tag.svg"/>
                            </C.HashIcon>

                            <C.TitleSection>
                                <C.MainTitle>
                                    쿠팡의 평점을
                                    <br />
                                    <C.BlueText>키워드</C.BlueText>
                                    로 확인해보세요
                                </C.MainTitle>
                                <C.Subtitle>Ai가 100건의 리뷰를 분석했어요</C.Subtitle>
                            </C.TitleSection>

                            <C.KeywordGrid>
                                <C.KeywordItem >이벤트</C.KeywordItem>
                                <C.KeywordItem >이벤트</C.KeywordItem>
                                <C.KeywordItem >이벤트</C.KeywordItem>
                                <C.KeywordItem >이벤트</C.KeywordItem>
                                <C.KeywordItem >이벤트</C.KeywordItem>
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