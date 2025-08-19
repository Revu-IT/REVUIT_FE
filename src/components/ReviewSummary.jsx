// src/components/ReviewSummary.jsx
import React, { useEffect, useMemo, useState } from "react";
import * as R from "../styles/components/ReviewSummaryStyle";
import * as C from "../styles/CommonStyle";
import { getReviewSummary } from "../axios/monthly";

/** bars 만들기: 부정 상위 N + 긍정 상위 N */
function buildBars(summary, topN = 2) {
    const asNum = (v) => Number(v) || 0;

    const neg = (summary?.negative_opinions ?? [])
        .map((o) => ({
            content: o.content?.trim() ?? "",
            count: asNum(o.count),
            isPositive: false,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN);

    const pos = (summary?.positive_opinions ?? [])
        .map((o) => ({
            content: o.content?.trim() ?? "",
            count: asNum(o.count),
            isPositive: true,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN);

    const bars = [...neg, ...pos];

    // ✅ 전체 합계 기준
    const totalCount = bars.reduce((sum, b) => sum + b.count, 0) || 1;

    return bars.map((b) => ({
        ...b,
        widthPct: Math.max(8, (b.count / totalCount) * 100), // 최소 8%
    }));
}

export default function ReviewSummary({ departmentId, summary }) {
    const [data, setData] = useState(summary || null);
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(!summary);
    const [error, setError] = useState("");

    // 데이터 소스 결정
    useEffect(() => {
        let aborted = false;

        (async () => {
            try {
                setError("");
                setAnimate(false);

                if (summary) {
                    setData(summary);
                    setLoading(false);
                    setTimeout(() => !aborted && setAnimate(true), 50);
                    return;
                }

                if (!departmentId) {
                    setData(null);
                    setLoading(false);
                    return;
                }

                setLoading(true);
                const res = await getReviewSummary(departmentId);
                if (aborted) return;

                setData(res);
                setLoading(false);
                setTimeout(() => !aborted && setAnimate(true), 50);
            } catch (e) {
                console.error(e);
                if (!aborted) {
                    setError("요약을 불러오지 못했습니다.");
                    setLoading(false);
                }
            }
        })();

        return () => {
            aborted = true;
        };
    }, [departmentId, summary]);

    const bars = useMemo(() => buildBars(data), [data]);

    if (loading) {
        return (
            <R.ReviewSummary>
                <C.StatusCard>
                    <C.Spinner /> 데이터 불러오는 중…
                </C.StatusCard>
            </R.ReviewSummary>
        );
    }

    if (error) {
        return <C.ErrorCard>{error}</C.ErrorCard>;
    }

    if (!data) return null;

    return (
        <R.ReviewSummary>
            {bars.map((b, idx) => (
                <R.BarContainer key={`${b.content}-${idx}`}>
                    <R.BackgroundBar>
                        <R.progressBar
                            width={animate ? b.widthPct : 0}
                            isPositive={b.isPositive}
                        ></R.progressBar>
                        <R.BarText visible={animate}>{b.content}</R.BarText>
                        <R.Count>{b.count}개</R.Count>
                    </R.BackgroundBar>
                </R.BarContainer>
            ))}
        </R.ReviewSummary>
    );
}
