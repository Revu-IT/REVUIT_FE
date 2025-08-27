import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Header from "../../components/HeaderBack";
import * as C from "../../styles/user/Signup";
import * as C2 from "../../styles/user/Signup2";
import { companyMap } from "../../utils/companyMap";
import checkValid from "../../assets/images/checkmark_valid.svg";
import deleteValid from "../../assets/images/delete_valid.svg";
import checkSelected from "../../assets/images/checkmark_selected.svg";

function Signup() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["authToken"]);

    // 단계 관리
    const [step, setStep] = useState(1);

    // Step 1 데이터
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setPasswordConfirm] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    // Step 2 데이터
    const [selectedCompany, setSelectedCompany] = useState(null); // number | null

    // companyMap → 배열 변환
    const companies = Object.entries(companyMap).map(([id, data]) => ({
        company_id: Number(id), // DB 저장용 id
        name: data.name, // 영문 키워드
        display: data.display, // 화면 표시용 이름
        category: "플랫폼", // 공통 카테고리
        logo: data.logo, // 이미지 경로(모듈 import 또는 /public 절대경로)
    }));

    // Step 1 유효성 검사 및 다음 단계로
    const handleStep1Next = (event) => {
        event.preventDefault();

        // 비밀번호 불일치 체크
        if (password !== password_confirm) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
            return;
        } else {
            setPasswordConfirmError("");
        }

        // 비밀번호 유효성 체크
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("영문, 숫자, 특수문자 포함 8자 이상으로 입력해주세요.");
            return;
        } else {
            setPasswordError("");
        }

        // 이메일 체크
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        // 모든 유효성 검사 통과하면 다음 단계로
        setStep(2);
    };

    // 회사 선택
    const handleCompanySelect = (companyId) => {
        setSelectedCompany(companyId); // number
    };

    // 최종 회원가입
    const handleFinalSignup = async () => {
        const selectedCompanyData = companies.find((company) => company.company_id === selectedCompany);

        if (!selectedCompanyData) {
            alert("기업을 선택해주세요.");
            return;
        }

        // API URL
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
        const signupUrl = `${apiUrl}/user/signup`;
        // 프록시 사용 시:
        //const signupUrl = `/api/user/signup`;

        try {
            const response = await axios.post(
                signupUrl,
                {
                    email,
                    password,
                    password_confirm,
                    company_id: selectedCompanyData.company_id,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // CORS 쿠키 전송을 위해
                }
            );

            console.log("서버 응답:", response);

            if (response.status === 201) {
                setCookie("authToken", response.data.authToken, { path: "/" });
                alert(response.data.message || "회원가입이 완료되었습니다!");
                navigate("/signin");
            } else {
                alert(`회원가입 실패: ${response.data.message || "알 수 없는 오류"}`);
            }
        } catch (error) {
            console.error("회원가입 실패:", error);

            if (axios.isAxiosError(error)) {
                console.log("Axios config:", error.config);
                console.log("Axios request:", error.request);
                console.log("Axios response:", error.response);
            }

            if (error.response && error.response.data && error.response.data.message) {
                alert(`회원가입 실패: ${error.response.data.message}`);
            } else {
                alert("회원가입 실패: 네트워크 오류가 발생했습니다.");
            }
        }
    };

    // Step 1 렌더링
    const renderStep1 = () => (
        <C.Page>
            <C.Center>
                <C.PageSpace>
                    <Header />
                    <C.Title>
                        <C.SubTitle>회원정보</C.SubTitle>를
                        <br />
                        입력해주세요.
                    </C.Title>

                    <C.FormContainer>
                        <C.InputContainer>
                            <C.InputLabel>이메일 주소</C.InputLabel>
                            <C.InputWrapper>
                                <C.InputField
                                    type="email"
                                    placeholder="abc@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                                <C.ValidationIcon />
                            </C.InputWrapper>
                        </C.InputContainer>

                        <C.InputContainer>
                            <div style={{ display: "flex" }}>
                                <C.InputLabel>비밀번호</C.InputLabel>
                                {password &&
                                    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/.test(password) && (
                                        <C.ErrorMessage>
                                            &nbsp;&nbsp;영문, 숫자, 특수문자 포함 8자 이상으로 입력해주세요
                                        </C.ErrorMessage>
                                    )}
                                {passwordError && <C.ErrorMessage>&nbsp;&nbsp;{passwordError}</C.ErrorMessage>}
                            </div>
                            <C.InputWrapper>
                                <C.InputField
                                    type="password"
                                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                <C.ValidationIcon>
                                    {password &&
                                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/.test(
                                            password
                                        ) && <img src={checkValid} alt="valid" />}
                                    {password &&
                                        !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/.test(
                                            password
                                        ) && <img src={deleteValid} alt="invalid" />}
                                </C.ValidationIcon>
                            </C.InputWrapper>
                        </C.InputContainer>

                        <C.InputContainer>
                            <div style={{ display: "flex" }}>
                                <C.InputLabel>비밀번호 확인</C.InputLabel>
                                {passwordConfirmError && (
                                    <C.ErrorMessage>&nbsp;&nbsp;{passwordConfirmError}</C.ErrorMessage>
                                )}
                            </div>
                            <C.InputWrapper>
                                <C.InputField
                                    type="password"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    value={password_confirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    autoComplete="new-password"
                                />
                                <C.ValidationIcon>
                                    {password_confirm && password_confirm === password && (
                                        <img src={checkValid} alt="match" />
                                    )}
                                    {password_confirm && password_confirm !== password && (
                                        <img src={deleteValid} alt="not-match" />
                                    )}
                                </C.ValidationIcon>
                            </C.InputWrapper>

                            <C.SubmitButton onClick={handleStep1Next}>다음</C.SubmitButton>
                        </C.InputContainer>
                    </C.FormContainer>
                </C.PageSpace>
            </C.Center>
        </C.Page>
    );

    // Step 2 렌더링
    const renderStep2 = () => (
        <C2.Page>
            <C2.Center>
                <C2.PageSpace>
                    <Header />
                    <C.Title>
                        리뷰를 확인할
                        <br />
                        <C.SubTitle>기업</C.SubTitle>을 선택해주세요.
                    </C.Title>
                    <C2.CompanyList>
                        {companies.map((company) => {
                            const isSelected = selectedCompany === company.company_id;
                            return (
                                <C2.CompanyItem
                                    key={company.company_id}
                                    selected={isSelected}
                                    onClick={() => handleCompanySelect(company.company_id)}
                                >
                                    <C2.CompanyLogo>
                                        <img src={company.logo} alt={`${company.display} 로고`} />
                                    </C2.CompanyLogo>
                                    <C2.CompanyInfo>
                                        <C2.CompanyName>{company.name}</C2.CompanyName>
                                        <C2.CompanyCategory>{company.category}</C2.CompanyCategory>
                                    </C2.CompanyInfo>
                                    <C2.CheckIcon selected={isSelected}>
                                        {isSelected && <img src={checkSelected} alt="selected" />}
                                    </C2.CheckIcon>
                                </C2.CompanyItem>
                            );
                        })}
                    </C2.CompanyList>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <C2.SubmitButton onClick={handleFinalSignup}>회원가입</C2.SubmitButton>
                    </div>
                </C2.PageSpace>
            </C2.Center>
        </C2.Page>
    );

    return <>{step === 1 ? renderStep1() : renderStep2()}</>;
}

export default Signup;
