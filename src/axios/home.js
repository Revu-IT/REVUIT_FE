import api from "./instance";

// 전체리뷰 및 업계평균 그래프
export const getStatistics = async () => {
    const { data } = await api.get("/main/statistics"); // → /api/main/statistics 로 전송됨
    return data;
};
