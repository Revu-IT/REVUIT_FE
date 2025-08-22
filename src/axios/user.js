import api from "./instance";

// 마이페이지 정보 조회
export const getMyPage = async () => {
    const { data } = await api.get("/user/mypage");
    return data;
};

// 마이페이지 정보 수정
export const updateMyPage = async ({
    email,
    password,
    password_confirm,
    company_id,
}) => {
    const payload = { email, password, password_confirm, company_id };
    const { data } = await api.put("/user/mypage/update", payload);
    return data;
};

export default { getMyPage, updateMyPage };
