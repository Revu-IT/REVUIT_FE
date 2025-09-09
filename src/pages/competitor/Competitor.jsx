import React from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/CompetitorLikeStyles";
import { useNavigate } from "react-router-dom";
import Group30 from "../../assets/images/Group 30.png";
import Group32 from "../../assets/images/Group 32.png";
import keywonder from "../../assets/images/keywonder.svg";

import Header from "../../components/Header";

function Competitor() {
    const navigate = useNavigate();
    const handleLike = () => {
        navigate("/competitor/like");
    };
    const handleDislike = () => {
        navigate("/competitor/dislike");
    };
    const handleKeyword = () => {
        navigate("/competitor/keyword");
    };
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="경쟁사 분석" />
                        <L.Con>
                            <img src={Group30} onClick={handleLike} />
                            <img src={Group32} onClick={handleDislike} />
                            <img src={keywonder} onClick={handleKeyword} />
                        </L.Con>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Competitor;
