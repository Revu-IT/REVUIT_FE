import React from "react";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentHelpStyle";

import Header from "../../components/HeaderBack";
import question from "../../assets/images/department_question.svg";
import example1 from "../../assets/images/department_example1.svg";
import example2 from "../../assets/images/department_example2.svg";

function DepartmentHelp() {
    return (
        <>
            <C.Page bg="#f3f4f7">
                <C.Center>
                    <C.PageSpace>
                        <Header />
                        <D.Help>
                            <D.Container>
                                <D.Title>
                                    이 리뷰의 <span>담당 부서</span>가
                                    궁금하다고요?{" "}
                                </D.Title>
                                <D.Desc>
                                    원활한 CS 관리를 위해 AI가 분류했어요.
                                </D.Desc>
                                <D.ExampleImg
                                    src={question}
                                    alt="예시 이미지"
                                    width="128px"
                                />
                            </D.Container>
                            <D.Container>
                                <D.Subtitle>
                                    원하는 부서를 <span>선택</span>하면
                                </D.Subtitle>
                                <D.ExampleImg
                                    src={example1}
                                    alt="예시 이미지"
                                    width="303px"
                                    style={{ marginLeft: "-0.002px" }}
                                />
                            </D.Container>
                            <D.Container>
                                <D.Subtitle>
                                    부서에 <span>배정</span>된 리뷰를 확인할 수
                                    있어요.
                                </D.Subtitle>
                                <D.ExampleImg
                                    src={example2}
                                    alt="예시 이미지"
                                    width="263px"
                                />
                            </D.Container>
                            <D.DepartmentButton>
                                리뷰 확인하러 가기
                            </D.DepartmentButton>
                        </D.Help>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default DepartmentHelp;
