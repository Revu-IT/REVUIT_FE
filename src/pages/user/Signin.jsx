import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import * as C from "../../styles/user/Signin";
import Header from "../../components/HeaderBack";
import { useNavigate } from "react-router-dom";

function Signin() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["accessToken", "refreshToken"]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // 기본 유효성 검사
        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            setIsLoading(false);
            return;
        }

        // API URL
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const loginUrl = `${apiUrl}/user/login`;
        //프록시 사용 시:
        //const loginUrl = `/api/user/login`;

        try {
            console.log("로그인 요청:", { email, password });

            const response = await axios.post(
                loginUrl,
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("로그인 응답:", response.data);

            // 서버 응답에서 토큰 추출
            const accessToken = response.data.access_token;
            const tokenType = response.data.token_type;

            if (accessToken) {
                // 토큰 저장 (Bearer 형식으로)
                setCookie("accessToken", `${tokenType} ${accessToken}`, {
                    path: "/",
                    maxAge: 3600, // 1시간
                });
                setCookie("email", email, { path: "/" });

                console.log("토큰 저장 완료:", `${tokenType} ${accessToken}`);

                alert("로그인 성공!");
                navigate("/home");
            } else {
                alert("로그인 실패: 서버에서 반환된 토큰이 없습니다.");
            }
        } catch (error) {
            console.error("로그인 실패:", error);

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 서버에서 응답이 온 경우
                    const status = error.response.status;
                    const message =
                        error.response.data?.detail || error.response.data?.message || "로그인에 실패했습니다.";

                    console.log("서버 에러 응답:", error.response.data);

                    if (status === 401) {
                        alert("이메일 또는 비밀번호가 일치하지 않습니다.");
                    } else if (status === 422) {
                        alert("입력 정보가 올바르지 않습니다.");
                    } else if (status === 404) {
                        alert("존재하지 않는 사용자입니다.");
                    } else {
                        alert(`로그인 실패: ${message}`);
                    }
                } else if (error.request) {
                    console.log("요청 실패:", error.request);
                    alert("서버에 연결할 수 없습니다. CORS 설정을 확인해주세요.");
                }
            } else {
                alert("알 수 없는 오류가 발생했습니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header />

                        <C.SubTitle1>한 걸음만 더!</C.SubTitle1>
                        <div
                            style={{
                                fontWeight: "bold",
                                margin: "5px 20px",
                                color: "black",
                            }}
                        >
                            로그인하고 리뷰의 가치를 발견해보세요.
                        </div>
                        <br />
                        <br />
                        <br />

                        <form onSubmit={handleLogin}>
                            <C.FormContainer>
                                <C.InputContainer>
                                    <C.InputLabel>이메일 주소</C.InputLabel>

                                    <C.InputWrapper>
                                        <C.InputField
                                            type="email"
                                            placeholder="abc@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </C.InputWrapper>
                                </C.InputContainer>

                                <C.InputContainer>
                                    <C.InputLabel>비밀번호</C.InputLabel>
                                    <C.InputWrapper>
                                        <C.InputField
                                            type="password"
                                            placeholder="비밀번호를 입력해주세요"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </C.InputWrapper>
                                </C.InputContainer>

                                <C.LoginButton
                                    type="submit"
                                    disabled={isLoading}
                                    style={{
                                        opacity: isLoading ? 0.6 : 1,
                                        cursor: isLoading ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {isLoading ? "로그인 중..." : "로그인"}
                                </C.LoginButton>
                            </C.FormContainer>
                        </form>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default Signin;
