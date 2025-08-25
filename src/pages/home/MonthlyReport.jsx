// pages/home/MonthlyReport.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MonthlyReportStyle";

import Header from "../../components/HeaderBack";
import DepartmentCard from "../../components/DepartmentCard";
import { DEPARTMENTS } from "../../utils/departmentsMap";
import { getReviewSummary } from "../../axios/monthly";

function MonthlyReport() {
    const navigate = useNavigate();

    const [pageLoading, setPageLoading] = useState(true);
    const [pageError, setPageError] = useState("");

    // 프리패치된 데이터
    const [summariesById, setSummariesById] = useState({});
    const [reportsById, setReportsById] = useState({});
    const [errorsById, setErrorsById] = useState({});

    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setPageLoading(true);
                setPageError("");

                const results = await Promise.allSettled(
                    DEPARTMENTS.map((d) => getReviewSummary(d.id))
                );
                if (aborted) return;

                const nextSummary = {};
                const nextReport = {};
                const nextError = {};

                results.forEach((res, idx) => {
                    const deptId = DEPARTMENTS[idx].id;
                    if (res.status === "fulfilled") {
                        const s = res.value; // API 형태 불일치 대비
                        nextSummary[deptId] = s ?? null;
                        nextReport[deptId] =
                            s?.reports ?? s?.data?.reports ?? "";
                        nextError[deptId] = "";
                    } else {
                        nextSummary[deptId] = null;
                        nextReport[deptId] = "";
                        nextError[deptId] =
                            res.reason?.response?.data?.detail ||
                            res.reason?.message ||
                            "요약을 불러오지 못했습니다.";
                    }
                });

                const anySuccess = Object.values(nextSummary).some(Boolean);
                if (!anySuccess)
                    setPageError("월간 리포트를 불러오지 못했습니다.");

                setSummariesById(nextSummary);
                setReportsById(nextReport);
                setErrorsById(nextError);
            } catch (e) {
                console.log(e);
                if (!aborted)
                    setPageError("월간 리포트를 불러오지 못했습니다.");
            } finally {
                if (!aborted) setPageLoading(false);
            }
        })();

        return () => {
            aborted = true;
        };
    }, []);

    const handleHome = () => navigate("/home");

    return (
        <C.Page>
            <C.Center>
                <C.PageSpace bg="#f3f4f7">
                    {/* 페이지 단일 게이트 (헤더 포함 가림) */}
                    {pageLoading ? (
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
                                <C.Spinner /> 불러오는 중…
                            </C.StatusCard>
                        </div>
                    ) : pageError ? (
                        <div
                            style={{
                                minHeight: "100dvh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 24,
                            }}
                        >
                            <C.ErrorCard>{pageError}</C.ErrorCard>
                        </div>
                    ) : (
                        <>
                            <Header />
                            <M.Report>
                                <M.Container>
                                    {DEPARTMENTS.map((dept) => (
                                        <li
                                            key={dept.id}
                                            style={{ listStyle: "none" }}
                                        >
                                            <DepartmentCard
                                                id={dept.id}
                                                en={dept.en}
                                                /** ✅ 프리패치 주입 */
                                                summary={
                                                    summariesById[dept.id] ||
                                                    null
                                                }
                                                summaryError={
                                                    errorsById[dept.id] || ""
                                                }
                                                report={
                                                    reportsById[dept.id] || ""
                                                }
                                            />
                                        </li>
                                    ))}
                                </M.Container>
                                <M.Button onClick={handleHome}>
                                    메인으로
                                </M.Button>
                            </M.Report>
                        </>
                    )}
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );
}

export default MonthlyReport;
