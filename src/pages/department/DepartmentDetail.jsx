import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import ReviewCard from "../../components/ReviewCard";
import ReviewSummary from "../../components/ReviewSummary";

import Header from "../../components/Header";
import help from "../../assets/images/questionmark.svg";

function DepartmentDetail() {
    const navigate = useNavigate();

    const handleHelp = () => {
        navigate("/department/help");
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
                        <ReviewSummary />
                        <ReviewCard />
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default DepartmentDetail;
