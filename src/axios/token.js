export const getCookie = (name) => {
    const m = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : null;
};

export const setCookie = (name, value, maxAgeSec = 3600) => {
    document.cookie = `${name}=${encodeURIComponent(
        value
    )}; path=/; max-age=${maxAgeSec}; samesite=lax`;
};

export const removeCookie = (name) => {
    document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

// 프로젝트에서 쓰는 이름 그대로 사용
export const getAccessToken = () => getCookie("accessToken"); // 예: "Bearer xxxxx"
export const getRefreshToken = () => getCookie("refreshToken"); // 값만(접두사 없이)
