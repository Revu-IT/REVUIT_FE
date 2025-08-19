import api from "./instance";

// 분기별 리포트
export const getReviewSummary = async (departmentId) => {
    const { data } = await api.get("/departments/summary", {
        params: { departmentId },
    });
    return data;
};
