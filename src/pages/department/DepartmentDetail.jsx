// pages/department/DepartmentDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentDetailStyle";

import Header from "../../components/Header";
import ReviewCard from "../../components/ReviewCard";
import ReviewSummary from "../../components/ReviewSummary";

import { getDepartmentReviews } from "../../axios/departments";
import { getReviewSummary } from "../../axios/monthly"; // ✅ 요약 API
import useRenderTitle from "../../hooks/useRenderTitle";
import { DEPARTMENTS } from "../../utils/departmentsMap";

import help from "../../assets/images/questionmark.svg";

function DepartmentDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const departmentId = Number(id);

    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ 단일 로딩
    const [error, setError] = useState(""); // ✅ 단일 에러

    const deptMeta = useMemo(
        () => DEPARTMENTS.find((d) => d.id === departmentId),
        [departmentId]
    );
    const titleEn = deptMeta?.en ?? "";

    const renderTitle = useRenderTitle({
        ampSize: 24,
        nonBreakBigrams: [["Seller", "Support"]],
    });

    const handleHelp = () => navigate("/department/help");

    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                setLoading(true);
                setError("");

                // ✅ 요약 + 리뷰 동시 요청
                const [revRes, sumRes] = await Promise.all([
                    getDepartmentReviews(departmentId),
                    getReviewSummary(departmentId),
                ]);
                if (aborted) return;

                setReviews(
                    Array.isArray(revRes?.reviews) ? revRes.reviews : []
                );
                setSummary(sumRes ?? null);
            } catch (e) {
                console.error(e);
                if (!aborted) setError("데이터를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setLoading(false);
            }
        })();
        return () => {
            aborted = true;
        };
    }, [departmentId]);

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    {/* ✅ 페이지 전체 로딩/에러 게이트(헤더 포함) */}
                    {loading ? (
                        <div
                            style={{
                                minHeight: "100dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                            }}
                        >
                            <C.StatusCard>
                                <C.Spinner />
                                데이터 불러오는 중…
                            </C.StatusCard>
                        </div>
                    ) : error ? (
                        <div
                            style={{
                                minHeight: "100dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                            }}
                        >
                            <C.ErrorCard>{error}</C.ErrorCard>
                        </div>
                    ) : (
                        <>
                            {/* ✅ 로딩 완료 후에만 Header + 본문 렌더 */}
                            <C.FixedHeaderWrapper>
                                <Header
                                    Title="부서 분류"
                                    HelpContent={
                                        <img
                                            src={help}
                                            alt="도움말"
                                            onClick={handleHelp}
                                        />
                                    }
                                />
                            </C.FixedHeaderWrapper>

                            <D.Detail>
                                <D.title>
                                    {titleEn
                                        ? renderTitle(titleEn)
                                        : "Department"}
                                </D.title>

                                {/* ✅ 프리패치한 summary 전달 → 내부 fetch 스킵 */}
                                <ReviewSummary
                                    departmentId={departmentId}
                                    summary={summary}
                                />
                                <D.Line />

                                <ReviewCard reviews={reviews} />
                            </D.Detail>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default DepartmentDetail;
