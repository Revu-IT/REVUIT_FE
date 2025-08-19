import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentStyle";

import Header from "../../components/Header";
import help from "../../assets/images/questionmark.svg";

function Department() {
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

                        <D.Department>
                            <D.Card>
                                <D.Title>{renderTitle(title)}</D.Title>
                                <D.Desc>
                                    사회에 영향을 미치는 다양한 문제를 다루며,
                                    이를 통해 지속적인 성장과 글로벌 확장을
                                    이끌고 있어요
                                </D.Desc>
                                <D.ReviewButton>리뷰 바로가기 →</D.ReviewButton>
                            </D.Card>

                            <D.Card>
                                <D.Title>{renderTitle(title)}</D.Title>
                                <D.Desc>
                                    사회에 영향을 미치는 다양한 문제를 다루며,
                                    이를 통해 지속적인 성장과 글로벌 확장을
                                    이끌고 있어요
                                </D.Desc>
                                <D.ReviewButton>리뷰 바로가기 →</D.ReviewButton>
                            </D.Card>

                            <D.Card>
                                <D.Title>{renderTitle(title)}</D.Title>
                                <D.Desc>
                                    사회에 영향을 미치는 다양한 문제를 다루며,
                                    이를 통해 지속적인 성장과 글로벌 확장을
                                    이끌고 있어요
                                </D.Desc>
                                <D.ReviewButton>리뷰 바로가기 →</D.ReviewButton>
                            </D.Card>
                        </D.Department>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Department;
