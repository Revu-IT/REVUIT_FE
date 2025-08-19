import React from "react";
import * as T from "../styles/components/TotalReviewStyle";

import total from "../assets/images/total_review.svg";
import temu from "../assets/images/temu.svg";
// import gmarket from "../assets/images/gmarket.svg";
// import eleven from "../assets/images/11st.svg";
// import coupang from "../assets/images/coupang.svg";
// import ali from "../assets/images/ali.svg";

function TotalReview() {
    return (
        <T.Total>
            <T.Title>
                <T.Logo src={temu} />
                {/* 기업명 */}테무 총 리뷰
            </T.Title>
            <T.Content>
                <T.Img src={total} /> 632,000
            </T.Content>
        </T.Total>
    );
}

export default TotalReview;
