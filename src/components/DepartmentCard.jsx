import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as D from "../styles/components/DepartmentCardStyle";
import ReviewSummary from "./ReviewSummary"; // ✅ 같은 폴더면 ./ 로 고치기
import { getReviewSummary } from "../axios/monthly";
import light from "../assets/images/light.svg";

function DepartmentCard({ id, en }) {
    const navigate = useNavigate();
    const departmentId = Number(id); // ✅ 타입 보정

    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        if (!departmentId) return;
        let aborted = false;

        (async () => {
            try {
                setLoading(true);
                setErr("");

                // ✅ 1) 숫자 인자 버전
                let res = await getReviewSummary(departmentId);

                // ✅ 2) 객체 인자(쿼리) 버전으로만 동작한다면 주석 해제
                // let res = await getReviewSummary({ departmentId });

                // ✅ 방어적 파싱
                const text =
                    typeof res === "string"
                        ? res
                        : typeof res?.data === "string"
                        ? res.data
                        : res?.data?.report ??
                          res?.data?.content ??
                          res?.report ??
                          res?.content ??
                          "";

                if (!aborted) setReport((text ?? "").toString().trim());
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
            <D.Title>{en}</D.Title>

            <D.Review>
                <ReviewSummary departmentId={departmentId} />
            </D.Review>

            <D.Ai>
                <D.AiTitle>
                    <D.AiImg src={light} /> AI 부서별 맞춤 리포트
                </D.AiTitle>

                {/* 서버가 HTML 문자열을 내려주면 아래 한 줄로 교체
            <D.AiContent dangerouslySetInnerHTML={{ __html: report }} /> */}
                <D.AiContent>
                    {loading
                        ? "리포트 불러오는 중..."
                        : err
                        ? err
                        : report || "분석 결과가 없습니다."}
                </D.AiContent>
            </D.Ai>

            <D.Other>
                <D.Date>오늘 09:00 기준</D.Date>
                <D.More onClick={handleDep}>리뷰 전체 보기 →</D.More>
            </D.Other>
        </D.Card>
    );
}

export default DepartmentCard;
