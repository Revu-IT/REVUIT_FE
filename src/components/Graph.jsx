// src/components/home/Graph.jsx
import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import * as G from "../styles/components/GraphStyle";

const MY_COLOR = "#007aff"; // 쿠팡 (파랑)
const INDUSTRY_COLOR = "#F5BF28"; // 업계 평균 (노랑)

export default function Graph({ title = "2025 리뷰 평점 추이", data = [] }) {
    const hasData = Array.isArray(data) && data.length > 0;

    return (
        <G.Card>
            <G.Header>
                <G.Title>{title}</G.Title>
                <G.Legend>
                    <G.LegendItem style={{ color: "#007aff" }}>
                        <G.Dot style={{ background: MY_COLOR }} />
                        쿠팡
                    </G.LegendItem>
                    <G.LegendItem style={{ color: "#F5BF28" }}>
                        <G.Dot style={{ background: INDUSTRY_COLOR }} />
                        업계 평균
                    </G.LegendItem>
                </G.Legend>
            </G.Header>

            <G.ChartWrap>
                {hasData ? (
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart
                            data={data}
                            margin={{ top: 4, right: 14, bottom: 0, left: 0 }}
                        >
                            <CartesianGrid
                                stroke="#cccccc"
                                strokeDasharray="2 2"
                            />
                            <XAxis
                                dataKey="month"
                                interval={0}
                                tickFormatter={(v) => `${v}월`}
                                tick={{ fontSize: 10, fill: "#333333" }}
                                padding={{ left: 0, right: 0 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                type="number"
                                domain={[0, 5]}
                                ticks={[0, 1, 2, 3, 4, 5]}
                                tick={{ fontSize: 10, fill: "#333333" }}
                                allowDecimals={false}
                                tickCount={6}
                                width={28}
                                tickMargin={4}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="my"
                                name="쿠팡"
                                stroke={MY_COLOR}
                                strokeWidth={3}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="industry"
                                name="업계 평균"
                                stroke={INDUSTRY_COLOR}
                                strokeWidth={3}
                                dot={{ r: 3 }}
                                activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <G.Empty>데이터가 없습니다</G.Empty>
                )}
            </G.ChartWrap>
        </G.Card>
    );
}
