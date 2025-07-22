import React from "react";
import { useNavigate } from "react-router-dom";
import * as H from "../styles/components/HeaderStyle";

import back from "../assets/images/back.svg";

function Header({ Title, HelpContent = null }) {
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
                <H.Title>{Title}</H.Title>

                <H.Help>{HelpContent}</H.Help>
            </H.Header>
        </>
    );
}

export default Header;
