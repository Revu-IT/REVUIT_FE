import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as H from "../../styles/HomeStyle";

import Header from "../../components/HeaderMain";
import TotalReview from "../../components/TotalReview";
import Graph from "../../components/Graph";
import ReportCard from "../../components/ReportCard";
import KeywordCard from "../../components/KeywordCard";
import more from "../../assets/images/chevron_right.svg";

import {
    MOCK_SERIES,
    MOCK_TOTAL_REVIEW,
    MOCK_SENTIMENT,
} from "../../pages/home/dashboard";

function Home() {
    const navigate = useNavigate();

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    <Header />
                    <H.Home>
                        <TotalReview total={MOCK_TOTAL_REVIEW} />

                        <Graph title="2025 리뷰 평점 추이" data={MOCK_SERIES} />

                        <H.Monthly>
                            <H.Title
                                onClick={() => navigate("/monthly/report")}
                            >
                                분기별 리포트 <H.More src={more} />
                            </H.Title>
                            <ReportCard sentiment={MOCK_SENTIMENT} />
                        </H.Monthly>

                        <H.Monthly style={{ marginBottom: "101px" }}>
                            <H.Title
                                onClick={() => navigate("/monthly/keyword")}
                            >
                                분기별 키워드 <H.More src={more} />
                            </H.Title>
                            <KeywordCard />
                        </H.Monthly>
                    </H.Home>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default Home;
