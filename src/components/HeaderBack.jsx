import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/components/HeaderBackStyle";

import back from "../assets/images/back.svg";

function HeaderBack() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <H.Header>
                <H.Arrow onClick={handleBack}>
                    <img src={back} alt="뒤로가기" />
                </H.Arrow>
            </H.Header>
        </>
    );
}

export default HeaderBack;
