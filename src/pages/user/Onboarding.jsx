import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as O from "../../styles/user/OnboardingStyle";

import logo from "../../assets/images/logo.svg";

function Onboarding() {
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleSignin = () => {
        navigate("/signin");
    };

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <O.Onboarding>
                            <O.Logo>
                                <O.LogoImg src={logo} alt="revuit" />
                                <O.LogoTitle>
                                    데이터에 가려진 고객의 생각,
                                    <br />
                                    <span style={{ color: "#007BFF" }}>
                                        리뷰잇
                                    </span>
                                    이 명확하게 분석해드릴게요!
                                </O.LogoTitle>
                            </O.Logo>
                            <O.Container>
                                <O.SignupButton onClick={handleSignup}>
                                    시작하기
                                </O.SignupButton>
                                <O.SiginButton onClick={handleSignin}>
                                    이미 계정이 있나요?{" "}
                                    <span style={{ color: "#007BFF" }}>
                                        로그인
                                    </span>
                                </O.SiginButton>
                            </O.Container>
                        </O.Onboarding>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Onboarding;
