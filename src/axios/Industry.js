import api from "./instance";

// 분기별 리포트
export const getReviewSummary = async (departmentId) => {
    const { data } = await api.get("/departments/summary", {
        params: { departmentId },
    });
    return data;
};

export const getWordCloud2 = async (sentiment) => {
    const s = sentiment === "negative" ? "negative" : "positive";
    try {
        const { data } = await api.get(`analyze/wordcloud/all/${sentiment}`);
        return data;
    } catch (e) {
        const status = e?.response?.status;
        const detail = e?.response?.data?.detail || e?.response?.data?.message || e?.message;

        if (status === 400) {
            const err = new Error(detail || "최근 3개월 키워드가 충분하지 않습니다.");
            err.status = 400;
            throw err;
        }
        throw e;
    }
};
