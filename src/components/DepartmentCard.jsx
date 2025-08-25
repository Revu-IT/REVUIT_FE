// src/components/DepartmentCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import * as D from "../styles/components/DepartmentCardStyle";
import ReviewSummary from "./ReviewSummary";
import light from "../assets/images/light.svg";

function DepartmentCard({ id, en, summary, summaryError, report }) {
    const navigate = useNavigate();
    const departmentId = Number(id);

    const handleDep = () => navigate(`/department/${departmentId}/detail`);

    return (
        <D.Card>
            {/* 부서 영문명 */}
            <D.Title>{en}</D.Title>

            {/* 리뷰 요약: 프리패치 summary 주입 → 내부 fetch 스킵 */}
            <D.Review>
                {summaryError ? (
                    <D.AiContent>{summaryError}</D.AiContent>
                ) : (
                    <ReviewSummary
                        departmentId={departmentId}
                        summary={summary}
                    />
                )}
            </D.Review>

            {/* AI 리포트: 프리패치 report 사용 */}
            <D.Ai>
                <D.AiTitle>
                    <D.AiImg src={light} alt="light" /> AI 부서별 맞춤 리포트
                </D.AiTitle>

                {summaryError ? (
                    <D.AiContent>{summaryError}</D.AiContent>
                ) : report ? (
                    /<\/?[a-z][\s\S]*>/i.test(String(report)) ? (
                        <D.AiContent
                            dangerouslySetInnerHTML={{ __html: report }}
                        />
                    ) : (
                        <D.AiContent>{report}</D.AiContent>
                    )
                ) : (
                    <D.AiContent>분석 결과가 없습니다.</D.AiContent>
                )}
            </D.Ai>

            {/* 하단 기타 */}
            <D.Other>
                <D.Date>오늘 09:00 기준</D.Date>
                <D.More onClick={handleDep}>리뷰 전체 보기 →</D.More>
            </D.Other>
        </D.Card>
    );
}

export default DepartmentCard;
