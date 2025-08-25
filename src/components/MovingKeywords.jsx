import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const TOTAL_TRAVEL_VW = 140; // flyLeft의 이동량(-140vw)과 반드시 동일

const flyLeft = keyframes`
  0%   { transform: translateX(0); opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { transform: translateX(-140vw); opacity: 0; }
`;

const Cloud = styled.div`
    position: relative;
    width: 100%;
    height: ${(p) => (p.$height ? `${p.$height}px` : "220px")};
    overflow: hidden;
`;

const Tag = styled.div`
    position: absolute;
    left: 100%;
    top: var(--top, 0px);

    padding: 8px 14px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;

    animation: ${flyLeft} var(--dur, 12s) linear var(--delay, 0s) infinite;
    will-change: transform;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
`;

/**
 * props:
 *  - words: string[]
 *  - count: number = 12
 *  - height: number = 220
 *  - lanes: number = 6          // 세로 레인 수
 *  - duration: number = 12      // 모든 아이템 동일 속도
 *  - gapVW: number = 30         // 같은 레인에서 아이템 간 최소 간격(vw)
 *  - approxTagH: number = 36    // 태그 높이 추정(폰트/패딩에 맞춰 조절)
 */
export default function MovingKeywords({
    words = [],
    count = 12,
    height = 220,
    lanes = 6,
    duration = 12,
    gapVW = 30,
    approxTagH = 36,
}) {
    // 1) 아이템 초기 배치: 레인/텍스트/탑 계산 (세로 겹침 원천 차단)
    const items = useMemo(() => {
        const L = Math.max(1, Math.min(lanes, count));
        const laneH = height / L;
        const laneTops = Array.from({ length: L }, (_, i) =>
            Math.round(i * laneH + Math.max(0, (laneH - approxTagH) / 2))
        );

        return Array.from({ length: count }, (_, i) => ({
            text: words.length ? words[i % words.length] : "키워드",
            lane: i % L,
            top: laneTops[i % L],
            key: `kw-${i}`,
        }));
    }, [words, count, height, lanes, approxTagH]);

    // 2) 각 태그 실제 너비를 측정해, 레인별로 겹치지 않도록 delay 계산
    const refs = useRef([]);
    const [delays, setDelays] = useState([]);

    useLayoutEffect(() => {
        const vwPx = window.innerWidth / 100; // 1vw의 px
        const widthsVW = items.map((_, i) => {
            const el = refs.current[i];
            const px = el ? el.offsetWidth : 80; // fallback
            return px / vwPx;
        });

        // 레인별로 아이템 인덱스를 모아 순서대로 delay 배치
        const byLane = new Map();
        items.forEach((it, i) => {
            if (!byLane.has(it.lane)) byLane.set(it.lane, []);
            byLane.get(it.lane).push(i);
        });

        const d = Array(items.length).fill(0);
        byLane.forEach((idxList) => {
            // 출발 순서 섞기(시작 위치 다양화)
            // idxList.sort(() => Math.random() - 0.5);  // 원하면 활성화

            let accSec = 0;
            idxList.forEach((i) => {
                // 같은 레인에서 이전 아이템과 겹치지 않도록 필요한 시간 간격 계산
                const needVW = widthsVW[i] + gapVW;
                const gapSec = (needVW * duration) / TOTAL_TRAVEL_VW;
                d[i] = -accSec + (Math.random() * 0.08 - 0.04); // 미세 지터
                accSec += gapSec;
            });
            // 레인별 시작 시점을 랜덤하게 더 이동(전체적으로 흩뿌리기)
            const laneShift = -(Math.random() * duration);
            idxList.forEach((i) => (d[i] += laneShift));
        });

        setDelays(d);
    }, [items, duration, gapVW]);

    return (
        <Cloud $height={height}>
            {items.map((it, i) => (
                <Tag
                    key={it.key}
                    ref={(el) => (refs.current[i] = el)}
                    style={{
                        "--top": `${it.top}px`,
                        "--dur": `${duration}s`,
                        "--delay": `${delays[i] || 0}s`,
                    }}
                >
                    {it.text}
                </Tag>
            ))}
        </Cloud>
    );
}
