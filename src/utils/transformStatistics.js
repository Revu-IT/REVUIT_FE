export function toChartData(myAvgObj = {}, industryAvgObj = {}) {
    const months = Object.keys({ ...myAvgObj, ...industryAvgObj })
        .map(Number)
        .sort((a, b) => a - b);

    return months.map((m) => ({
        month: m,
        my: myAvgObj?.[String(m)] ?? null,
        industry: industryAvgObj?.[String(m)] ?? null,
    }));
}
