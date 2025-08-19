import api from "./instance";

// 전체리뷰 및 업계평균 그래프
export const getStatistics = async () => {
    try {
        const response = await api.get("/main/statistics");
        return response.data;
    } catch (error) {
        console.error("통계 조회 실패:", error);
        throw error;
    }
};
