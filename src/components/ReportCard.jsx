import React from "react";
import * as M from "../styles/components/MonthlyCardStyle";

import happy from "../assets/images/happy.svg";
import sad from "../assets/images/sad.svg";

function ReportCard({ companyInfo = null, positive = true, summary = "" }) {
    const companyLabel = companyInfo?.display ?? "내 회사";
    const face = positive ? happy : sad || happy;

    return (
        <M.Monthly>
            <M.Container>
                <M.Face src={face} alt={positive ? "긍정" : "부정"} />
                <M.Content>
                    <span>다수</span>의 고객이 {companyLabel}을<br></br>
                    <span>{summary}</span> <br></br>고 생각해요!
                </M.Content>
            </M.Container>
            <M.Date>오늘 09:00 기준</M.Date>
        </M.Monthly>
    );
}

export default ReportCard;
