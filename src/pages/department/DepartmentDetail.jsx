import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentDetailStyle";
import ReviewCard from "../../components/ReviewCard";
import ReviewSummary from "../../components/ReviewSummary";

import Header from "../../components/Header";
import help from "../../assets/images/questionmark.svg";

function DepartmentDetail() {
    const navigate = useNavigate();

    const handleHelp = () => {
        navigate("/department/help");
    };
    const title = "program management";

    const renderTitle = (text) => {
        return text.split(" ").map((word, index) => (
            <div key={index}>
                <span style={{ color: "#007bff" }}>{word.charAt(0)}</span>
                {word.slice(1)}
            </div>
        ));
    };
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <C.FixedHeaderWrapper>
                            <Header
                                Title="부서 분류"
                                HelpContent={
                                    <img
                                        src={help}
                                        alt="도움말"
                                        onClick={handleHelp}
                                    />
                                }
                            />
                        </C.FixedHeaderWrapper>
                        <D.Detail>
                            <D.title>{renderTitle(title)}</D.title>
                            <ReviewSummary />
                            <D.Line></D.Line>
                            <D.Container>
                                <ReviewCard />
                                <ReviewCard />
                                <ReviewCard />
                                <ReviewCard />
                                <ReviewCard />
                            </D.Container>
                        </D.Detail>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default DepartmentDetail;
