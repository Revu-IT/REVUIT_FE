// src/components/DepartmentCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as D from "../styles/components/DepartmentCardStyle";
import ReviewSummary from "./ReviewSummary";
import { getReviewSummary } from "../axios/monthly";
import light from "../assets/images/light.svg";

function DepartmentCard({ id, en }) {
    const navigate = useNavigate();
    const departmentId = Number(id); // 문자열일 수 있어 Number로 보정

    const [report, setReport] = useState("");
    const [isHtml, setIsHtml] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        if (!Number.isFinite(departmentId) || departmentId <= 0) {
            // id가 잘못되면 요청 안 함
            setErr("부서 식별자가 유효하지 않습니다.");
            return;
        }

        let aborted = false;

        (async () => {
            try {
                setLoading(true);
                setErr("");

                // 서버 호출
                const res = await getReviewSummary(departmentId);
                // console.log("getReviewSummary resp:", res);

                // ✅ 방어적 파싱: reports(복수) 포함
                const text =
                    typeof res === "string"
                        ? res
                        : typeof res?.data === "string"
                        ? res.data
                        : res?.data?.reports ??
                          res?.data?.report ??
                          res?.data?.content ??
                          res?.reports ??
                          res?.report ??
                          res?.content ??
                          "";

                const normalized = (text ?? "").toString().trim();
                const looksLikeHtml =
                    typeof normalized === "string" &&
                    /<\/?[a-z][\s\S]*>/i.test(normalized); // 아주 단순한 HTML 감지

                if (!aborted) {
                    setReport(normalized);
                    setIsHtml(looksLikeHtml);
                }
            } catch (e) {
                console.error(e);
                if (!aborted) setErr("리포트를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
    }, [departmentId]);

    const handleDep = () => navigate(`/department/${departmentId}/detail`);

    return (
        <D.Card>
            {/* 부서 영문명 */}
            <D.Title>{en}</D.Title>

            {/* 리뷰 요약(차트/카운트 등) */}
            <D.Review>
                <ReviewSummary departmentId={departmentId} />
            </D.Review>

            {/* AI 리포트 */}
            <D.Ai>
                <D.AiTitle>
                    <D.AiImg src={light} alt="light" /> AI 부서별 맞춤 리포트
                </D.AiTitle>

                {loading ? (
                    <D.AiContent>리포트 불러오는 중...</D.AiContent>
                ) : err ? (
                    <D.AiContent>{err}</D.AiContent>
                ) : report ? (
                    isHtml ? (
                        // 서버가 HTML 문자열을 줄 때
                        <D.AiContent
                            dangerouslySetInnerHTML={{ __html: report }}
                        />
                    ) : (
                        // 일반 텍스트일 때
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
