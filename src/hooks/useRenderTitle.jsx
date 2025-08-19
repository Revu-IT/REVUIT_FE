import { useCallback } from "react";

/**
 * 텍스트를 단어 단위로 쪼개 1글자만 파란색 처리하고
 * '&'는 작게, 특정 빅램은 같은 줄로 붙여 렌더하는 함수 반환
 */
export default function useRenderTitle({
    nonBreakBigrams = [["Seller", "Support"]],
    ampSize = 17, // & 폰트 크기
    ampColor = "#969696",
    firstLetterColor = "#007bff", // 단어 첫 글자 색
} = {}) {
    const renderTitle = useCallback(
        (text = "") => {
            const tokens = text.split(" ").filter(Boolean);
            const out = [];

            tokens.forEach((word, i) => {
                const prev = tokens[i - 1];
                const isAmp = word === "&";
                const shouldGlueWithPrev =
                    i > 0 &&
                    nonBreakBigrams.some(([a, b]) => prev === a && word === b);

                // 줄바꿈 규칙: 첫 토큰 제외, 현재 토큰이 '&'가 아닐 때
                if (i > 0 && !isAmp) {
                    if (shouldGlueWithPrev) out.push(" ");
                    else out.push(<br key={`br-${i}`} />);
                }

                if (isAmp) {
                    out.push(
                        <span
                            key={`amp-${i}`}
                            style={{
                                fontSize: `${ampSize}px`,
                                lineHeight: 1,
                                display: "inline-block",
                                marginLeft: 6,
                                marginRight: 2,
                                color: ampColor,
                            }}
                        >
                            &
                        </span>
                    );
                } else {
                    out.push(
                        <span
                            key={`w-${i}`}
                            style={{ display: "inline-block" }}
                        >
                            <span style={{ color: firstLetterColor }}>
                                {word.charAt(0)}
                            </span>
                            {word.slice(1)}
                        </span>
                    );
                }
            });

            return out;
        },
        [nonBreakBigrams, ampSize, ampColor, firstLetterColor]
    );

    return renderTitle;
}
