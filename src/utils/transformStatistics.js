export function toChartData(my = {}, industry = {}) {
    return Array.from({ length: 12 }, (_, i) => {
        const m = i + 1;
        return {
            month: m,
            my: my[String(m)] ?? null, // 값 없으면 null
            industry: industry[String(m)] ?? null,
        };
    });
}
