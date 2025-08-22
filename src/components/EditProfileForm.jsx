import React, { useMemo } from "react";
import * as E from "../styles/components/EditProfileFormStyle";

import checkOK from "../assets/images/checkmark_valid.svg";
import checkNO from "../assets/images/delete_valid.svg";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PW_RE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%#?&]{8,}$/;

function EditProfileForm({
    email,
    onEmailChange,
    password,
    onPasswordChange,
    passwordConfirm,
    onPasswordConfirmChange,
    emailError = "",
    passwordError = "",
    passwordConfirmError = "",
    disabled = false,
}) {
    // ✅ 유효성 판단 (아이콘 렌더에 사용)
    const emailOK = useMemo(() => EMAIL_RE.test(email), [email]);
    const pwOK = useMemo(() => PW_RE.test(password), [password]);
    const confirmOK = useMemo(
        () => passwordConfirm.length > 0 && passwordConfirm === password,
        [passwordConfirm, password]
    );

    return (
        <E.Edit>
            {/* 이메일 */}
            <E.Container>
                <E.Label>이메일 주소</E.Label>
                <E.InputWrap>
                    <E.Input
                        type="email"
                        inputMode="email"
                        placeholder="abc@email.com"
                        value={email}
                        onChange={(e) => onEmailChange?.(e.target.value)}
                        disabled={disabled}
                    />
                    {email && (
                        <E.ValidationIcon aria-hidden>
                            <img src={emailOK ? checkOK : checkNO} alt="" />
                        </E.ValidationIcon>
                    )}
                </E.InputWrap>
                {emailError && <E.Error>{emailError}</E.Error>}
            </E.Container>

            {/* 비밀번호 */}
            <E.Container>
                <E.Label>비밀번호</E.Label>
                <E.InputWrap>
                    <E.Input
                        type="password"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={password}
                        onChange={(e) => onPasswordChange?.(e.target.value)}
                        disabled={disabled}
                    />
                    {password && (
                        <E.ValidationIcon aria-hidden>
                            <img src={pwOK ? checkOK : checkNO} alt="" />
                        </E.ValidationIcon>
                    )}
                </E.InputWrap>
                {passwordError && <E.Error>{passwordError}</E.Error>}
            </E.Container>

            {/* 비밀번호 확인 */}
            <E.Container>
                <E.Label>비밀번호 확인</E.Label>
                <E.InputWrap>
                    <E.Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        value={passwordConfirm}
                        onChange={(e) =>
                            onPasswordConfirmChange?.(e.target.value)
                        }
                        disabled={disabled}
                    />
                    {passwordConfirm && (
                        <E.ValidationIcon aria-hidden>
                            <img src={confirmOK ? checkOK : checkNO} alt="" />
                        </E.ValidationIcon>
                    )}
                </E.InputWrap>
                {passwordConfirmError && (
                    <E.Error>{passwordConfirmError}</E.Error>
                )}
            </E.Container>
        </E.Edit>
    );
}

export default EditProfileForm;
