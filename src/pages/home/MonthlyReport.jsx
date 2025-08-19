import React from "react";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyReportStyle";

import Header from "../../components/HeaderBack";
import ReviewSummary from "../../components/ReviewSummary";

import light from "../../assets/images/light.svg";

function MonthlyReport() {
    return (
        <>
            <C.Page bg="#f3f4f7">
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <M.Report>
                            <M.Container>
                                <M.Card>
                                    <M.Title>Program Management</M.Title>
                                    <M.Review>
                                        <ReviewSummary />
                                    </M.Review>

                                    <M.Ai>
                                        <M.AiTitle>
                                            <M.AiImg src={light} /> AI 부서별
                                            맞춤 리포트
                                        </M.AiTitle>
                                        <M.AiContent>
                                            상품 검색 편의성과 최저가 정보
                                            제공에 대한 만족도가 높습니다. 반면,
                                            광고가 너무 자주 노출된다는 부정적
                                            의견이 반복적으로 나타나고 있습니다.
                                            사용자의 검색 흐름을 방해하지 않도록
                                            광고 빈도나 위치에 대한 재조정이
                                            필요합니다.
                                        </M.AiContent>
                                    </M.Ai>
                                    <M.Other>
                                        <M.Date>오늘 09:00 기준</M.Date>
                                        <M.More>리뷰 전체 보기 →</M.More>
                                    </M.Other>
                                </M.Card>

                                <M.Card>
                                    <M.Title>Program Management</M.Title>
                                    <M.Review>
                                        <ReviewSummary />
                                    </M.Review>

                                    <M.Ai>
                                        <M.AiTitle>
                                            <M.AiImg src={light} /> AI 부서별
                                            맞춤 리포트
                                        </M.AiTitle>
                                        <M.AiContent>
                                            상품 검색 편의성과 최저가 정보
                                            제공에 대한 만족도가 높습니다. 반면,
                                            광고가 너무 자주 노출된다는 부정적
                                            의견이 반복적으로 나타나고 있습니다.
                                            사용자의 검색 흐름을 방해하지 않도록
                                            광고 빈도나 위치에 대한 재조정이
                                            필요합니다.
                                        </M.AiContent>
                                    </M.Ai>
                                    <M.Other>
                                        <M.Date>오늘 09:00 기준</M.Date>
                                        <M.More>리뷰 전체 보기 →</M.More>
                                    </M.Other>
                                </M.Card>
                            </M.Container>
                            <M.Button>메인으로</M.Button>
                        </M.Report>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default MonthlyReport;
