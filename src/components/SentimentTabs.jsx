import React, { useState } from "react";
import * as S from "../styles/components/SentimentTabsStyle";

function SentimentTabs({ value, defaultValue = "positive", onChange }) {
    const isControlled = value !== undefined && value !== null;
    const [inner, setInner] = useState(defaultValue);
    const v = isControlled ? value : inner;
    const handleChange = (next) => {
        if (!isControlled) setInner(next);
        if (typeof onChange === "function") onChange(next);
    };

    return (
        <S.TabsWrap role="tablist" aria-label="리뷰 감정 필터">
            <S.Tab
                type="button"
                role="tab"
                aria-selected={v === "positive"}
                $active={v === "positive"}
                onClick={() => handleChange("positive")}
            >
                긍정
            </S.Tab>
            <S.Tab
                type="button"
                role="tab"
                aria-selected={v === "negative"}
                $active={v === "negative"}
                onClick={() => handleChange("negative")}
            >
                부정
            </S.Tab>
        </S.TabsWrap>
    );
}

export default SentimentTabs;
