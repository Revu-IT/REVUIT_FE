import React from "react";
import * as C from "../../styles/CommonStyle";
import * as L from "../../styles/competitor/competitorLikeStyle";
import { useNavigate } from "react-router-dom";

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
                            <img src="/src/assets/images/Group 30.png" onClick={handleLike} />
                            <img src="/src/assets/images/Group 32.png" onClick={handleDislike} />
                            <img src="/src/assets/images/keywonder.svg" onClick={handleKeyword} />
                        </L.Con>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Competitor;
