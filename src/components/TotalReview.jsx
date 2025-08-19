import React from "react";
import * as T from "../styles/components/TotalReviewStyle";

import total from "../assets/images/total_review.svg";

function TotalReview({ companyInfo, totalCount = 0 }) {
    return (
        <T.Total>
            <T.Title>
                {companyInfo?.logo && <T.Logo src={companyInfo.logo} />}
                {companyInfo?.display ?? "회사"} 총 리뷰
            </T.Title>
            <T.Content>
                <T.Img src={total} /> {Number(totalCount).toLocaleString()}
            </T.Content>
        </T.Total>
    );
}

export default TotalReview;
