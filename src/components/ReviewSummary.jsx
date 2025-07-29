import React, { useEffect, useState } from "react";
import * as R from "../styles/components/ReviewSummaryStyle";

function ReviewSummary() {
    const count = 1900;
    const total = 3000;

    const [width, setWidth] = useState(0);
    const [textVisible, setTextVisible] = useState(false);

    useEffect(() => {
        const percentage = (count / total) * 100;

        const timeout1 = setTimeout(() => setWidth(percentage), 100);
        const timeout2 = setTimeout(() => setTextVisible(true), 100);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, [count, total]);

    return (
        <R.ReviewSummary>
            <R.BarContainer>
                <R.BackgroundBar>
                    <R.progressBar width={width} isPositive={false}>
                        <R.BarText visible={textVisible}>
                            광고가 너무 자주 떠요
                        </R.BarText>
                    </R.progressBar>
                    <R.Count>{count}개</R.Count>
                </R.BackgroundBar>
            </R.BarContainer>

            <R.BarContainer>
                <R.BackgroundBar>
                    <R.progressBar width={width} isPositive={true}>
                        <R.BarText visible={textVisible}>
                            최저가 상품을 한 눈에 볼 수 있어서 좋아요
                        </R.BarText>
                    </R.progressBar>
                    <R.Count>{count}개</R.Count>
                </R.BackgroundBar>
            </R.BarContainer>
        </R.ReviewSummary>
    );
}

export default ReviewSummary;
