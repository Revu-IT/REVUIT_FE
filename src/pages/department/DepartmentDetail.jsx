import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as D from "../../styles/DepartmentDetailStyle";

import Header from "../../components/Header";
import ReviewCard from "../../components/ReviewCard";
import ReviewSummary from "../../components/ReviewSummary";

import { getDepartmentReviews } from "../../axios/departments";
import useRenderTitle from "../../hooks/useRenderTitle";
import { DEPARTMENTS } from "../../utils/departmentsMap"; // ★ 추가

import help from "../../assets/images/questionmark.svg";

function DepartmentDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const departmentId = Number(id);

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const totalCount = useMemo(() => reviews.length, [reviews]);

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
                const data = await getDepartmentReviews(departmentId);
                if (aborted) return;
                setReviews(Array.isArray(data?.reviews) ? data.reviews : []);
            } catch (e) {
                console.error(e);
                if (!aborted) setError("리뷰를 불러오지 못했습니다.");
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
                            {titleEn ? renderTitle(titleEn) : "Department"}
                        </D.title>

                        <ReviewSummary
                            departmentId={departmentId}
                            totalCount={totalCount}
                        />
                        <D.Line />

                        {loading ? (
                            <C.StatusCard>
                                <C.Spinner />
                                데이터 불러오는 중…
                            </C.StatusCard>
                        ) : error ? (
                            <C.ErrorCard>{error}</C.ErrorCard>
                        ) : (
                            <>
                                <ReviewCard reviews={reviews} />
                            </>
                        )}
                    </D.Detail>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default DepartmentDetail;
