import api from "./instance";

// 부서별 리뷰 리스트
export const getDepartmentReviews = async (departmentId) => {
    const { data } = await api.get("/departments/reviews", {
        params: { departmentId },
    });
    return data;
};
