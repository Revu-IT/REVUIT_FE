import React from "react";
import * as M from "../styles/components/MonthlyCardStyle";

import cloude from "../assets/images/cloude.svg";

function KeywordCard({ companyInfo = null, keywords = [], limit = 4 }) {
    const companyLabel = companyInfo?.display ?? "내 회사";
    const tags = (Array.isArray(keywords) ? keywords : [])
        .map((k) => String(k ?? "").trim())
        .filter(Boolean)
        .filter((k, i, arr) => arr.indexOf(k) === i)
        .slice(0, limit);

    const tagLine = tags.length
        ? tags.map((t) => `#${t}`).join(" ")
        : "#키워드 데이터가 없습니다";

    return (
        <M.Monthly>
            <M.Container>
                <M.Face src={cloude} />
                <M.Content>
                    {companyLabel}의 <span>분기별 키워드</span>를<br></br>
                    확인해보세요!
                    <M.Tag>{tagLine}</M.Tag>
                </M.Content>
            </M.Container>
            <M.Date>오늘 09:00 기준</M.Date>
        </M.Monthly>
    );
}

export default KeywordCard;
