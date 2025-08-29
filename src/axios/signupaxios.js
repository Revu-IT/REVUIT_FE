import api from "./instance";

// 회원가입 API
export const signupUser = async ({ email, password, password_confirm, company_id }) => {
    const res = await api.post("/user/signup", {
        email,
        password,
        password_confirm,
        company_id,
    });
    return res.data; // 서버 응답 data 반환
};
