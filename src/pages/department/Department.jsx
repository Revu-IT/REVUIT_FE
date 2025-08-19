import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentStyle";

import Header from "../../components/Header";
import help from "../../assets/images/questionmark.svg";
import { DEPARTMENTS } from "../../utils/departmentsMap";
import useRenderTitle from "../../hooks/useRenderTitle";

function Department() {
    const navigate = useNavigate();

    const handleHelp = () => {
        navigate("/department/help");
    };

    const renderTitle = useRenderTitle({
        ampSize: 24,
        nonBreakBigrams: [["Seller", "Support"]],
    });

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
                            {DEPARTMENTS.map((dept) => (
                                <D.Card key={dept.id}>
                                    <D.Title>
                                        {typeof renderTitle === "function"
                                            ? renderTitle(dept.en)
                                            : dept.en}
                                    </D.Title>

                                    <D.Desc>{dept.desc}</D.Desc>

                                    <D.ReviewButton
                                        onClick={() =>
                                            navigate(
                                                `/department/${dept.id}/detail`
                                            )
                                        }
                                    >
                                        리뷰 바로가기 →
                                    </D.ReviewButton>
                                </D.Card>
                            ))}
                        </D.Department>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Department;
