import api from "./instance";

export const signupUser = async ({ email, password, password_confirm, company_id }) => {
    const res = await api.post(
        "/user/signup",
        {
            email,
            password,
            password_confirm,
            company_id,
        },
        {
            withCredentials: true, // ✅ 옵션 유지
        }
    );
    return res; // ✅ 응답 전체 반환 (status + data 모두 확인 가능)
};
