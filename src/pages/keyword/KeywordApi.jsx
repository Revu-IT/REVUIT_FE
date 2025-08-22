// ✅ src/pages/keyword/KeywordApi.jsx (선택사항 - 위에서 직접 호출하므로 필요없을 수도 있음)
import api from "../../axios/instance";

export const getKeywordReviews = async (sentiment) => {
    try {
        const res = await api.get(`/analyze/keywords/${sentiment}`);
        console.log("API Response:", res.data);
        return Array.isArray(res.data?.data) ? res.data.data : [];
    } catch (error) {
        console.error("Keyword API Error:", error);
        throw error;
    }
};
