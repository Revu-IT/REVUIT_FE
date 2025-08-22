import React, { useEffect, useState } from "react";
import * as C from "../../styles/CommonStyle";
import * as P from "../../styles/ProfileSettingsStyle";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Header from "../../components/Header";
import Edit from "../../components/EditProfileForm";
import Change from "../../components/PlatformChangeForm";
import { getMyPage, updateMyPage } from "../../axios/user";

function ProfileSettings() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["email"]);
    const [loading, setLoading] = useState(false);
    const [, setFormError] = useState("");
    const [step, setStep] = useState(1); // 1: 프로필 입력 단계, 2: 플랫폼 선택 단계

    // form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [companyId, setCompanyId] = useState(null);

    // field errors
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");

    // 유효성 검사
    const validateStep1 = () => {
        let ok = true;
        setFormError("");

        // 이메일
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            ok = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("올바른 이메일 형식이 아니에요.");
            ok = false;
        } else {
            setEmailError("");
        }

        // 비밀번호 규칙
        const pwRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/;
        if (!pwRegex.test(password)) {
            setPasswordError(
                "영문, 숫자, 특수문자 포함 8자 이상으로 입력해주세요."
            );
            ok = false;
        } else {
            setPasswordError("");
        }

        // 비밀번호 확인
        if (password !== passwordConfirm) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
            ok = false;
        } else {
            setPasswordConfirmError("");
        }

        return ok;
    };

    // 최초 값 채우기
    useEffect(() => {
        (async () => {
            try {
                const me = await getMyPage(); // { email, company_id }
                setEmail(me?.email ?? "");
                setCompanyId(me?.company_id ?? null);
            } catch (e) {
                if (e?.response?.status === 401) {
                    navigate("/onboarding", { replace: true });
                } else {
                    setFormError("내 정보를 불러오지 못했습니다.");
                    console.error(e);
                }
            }
        })();
    }, [navigate]);

    const handleNext = async (e) => {
        e?.preventDefault?.();
        if (step === 1) {
            if (validateStep1()) setStep(2);
            return;
        }

        // step === 2 → 저장
        if (companyId == null) {
            setFormError("기업을 선택해주세요.");
            return;
        }

        try {
            setLoading(true);
            setFormError("");

            const res = await updateMyPage({
                email,
                password,
                password_confirm: passwordConfirm,
                company_id: companyId,
            });

            // 성공: 쿠키 이메일 갱신(마이페이지에서 써요)
            setCookie("email", res?.email ?? email, { path: "/" });

            // 완료 후 마이페이지로
            navigate("/mypage", { replace: true });
        } catch (e) {
            const status = e?.response?.status;
            const detail = e?.response?.data?.detail || "수정에 실패했습니다.";
            // 서버 명세 매핑
            if (status === 400 || status === 422) {
                if (detail.includes("비밀번호") && detail.includes("일치")) {
                    setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
                } else if (detail.includes("이미 존재하는 이메일")) {
                    setEmailError("이미 존재하는 이메일입니다.");
                } else {
                    setFormError(detail);
                }
            } else if (status === 401) {
                navigate("/signin", { replace: true });
            } else {
                setFormError(detail);
            }
            console.error(e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="마이페이지" />
                        <P.Profile>
                            <P.Title>
                                {step === 1 ? (
                                    <>
                                        <span>회원정보</span>를 <br />
                                        입력해주세요.
                                    </>
                                ) : (
                                    <>
                                        리뷰를 확인할
                                        <br />
                                        <span>기업</span>을 선택해주세요.
                                    </>
                                )}
                            </P.Title>
                            <P.Form as="form" onSubmit={handleNext}>
                                {step === 1 ? (
                                    <Edit
                                        email={email}
                                        onEmailChange={setEmail}
                                        password={password}
                                        onPasswordChange={setPassword}
                                        passwordConfirm={passwordConfirm}
                                        onPasswordConfirmChange={
                                            setPasswordConfirm
                                        }
                                        emailError={emailError}
                                        passwordError={passwordError}
                                        passwordConfirmError={
                                            passwordConfirmError
                                        }
                                        disabled={loading}
                                    />
                                ) : (
                                    <Change
                                        selectedCompanyId={companyId}
                                        onSelect={setCompanyId}
                                        disabled={loading}
                                    />
                                )}

                                <P.Button type="submit" disabled={loading}>
                                    {loading
                                        ? "처리 중…"
                                        : step === 1
                                        ? "다음"
                                        : "수정"}
                                </P.Button>
                            </P.Form>
                        </P.Profile>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default ProfileSettings;
