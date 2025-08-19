import React from "react";
import * as R from "../styles/components/ReviewCardStyle";

import star from "../assets/images/star.svg";
import thumbsup from "../assets/images/thumbsup.svg";

function fmtDate(s) {
    return (s || "").slice(0, 10); // "YYYY-MM-DD"
}

function ReviewCard({ reviews = [] }) {
    return (
        <R.ReviewCard>
            {reviews.map((r, i) => (
                <R.Container key={`${r.date}-${i}`}>
                    <R.Content>{r.content}</R.Content>
                    <R.Info>
                        <R.Score>
                            <R.InfoImg src={star} />
                            <R.InfoText>{r.score}</R.InfoText>
                            <R.InfoImg
                                src={thumbsup}
                                style={{ marginLeft: "10px" }}
                            />
                            <R.InfoText>{r.like}</R.InfoText>
                        </R.Score>
                        <R.InfoText>{fmtDate(r.date)}</R.InfoText>
                    </R.Info>
                </R.Container>
            ))}
        </R.ReviewCard>
    );
}

export default ReviewCard;
