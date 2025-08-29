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
            withCredentials: true, // ✅ 누락된 부분 추가
        }
    );
    return res; // ✅ 전체 응답 반환 (status + data)
};
