import api from "./instance";

// 전체리뷰 및 업계평균 그래프
export const getStatistics = async () => {
    const { data } = await api.get("/main/statistics");
    return data;
};

// 분기별 리포트
export const getMainReport = async () => {
    const { data } = await api.get("/main/summary");
    return data;
};

export default { getStatistics, getMainReport };
