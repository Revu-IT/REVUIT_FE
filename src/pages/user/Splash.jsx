import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as S from "../../styles/user/SplashStyle";

import logo from "../../assets/images/logo.svg";

function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/onboarding");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <S.Background>
                            <S.Logo src={logo} alt="revuit" />
                        </S.Background>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Splash;
