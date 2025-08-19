import React from "react";
import * as M from "../styles/components/MonthlyCardStyle";

import cloude from "../assets/images/cloude.svg";

function KeywordCard({ companyInfo = null }) {
    const companyLabel = companyInfo?.display ?? "내 회사";

    return (
        <M.Monthly>
            <M.Container>
                <M.Face src={cloude} />
                <M.Content>
                    {companyLabel}의 <span>분기별 키워드</span>를<br></br>
                    확인해보세요!
                    <M.Tag>#배송 #지연 #이벤트 #할인</M.Tag>
                </M.Content>
            </M.Container>
            <M.Date>오늘 09:00 기준</M.Date>
        </M.Monthly>
    );
}

export default KeywordCard;
