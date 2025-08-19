import React, { useState } from "react";
import * as C from "../../styles/CommonStyle";
import * as P from "../../styles/ProfileSettingsStyle";

import Header from "../../components/Header";
import Edit from "../../components/EditProfileForm";
import Change from "../../components/PlatformChangeForm";

function ProfileSettings() {
    const [step, setStep] = useState(1); // 1: 프로필 입력 단계, 2: 플랫폼 선택 단계

    const handleNext = () => {
        if (step === 1) {
            setStep(2); // 다음 단계로 이동
        } else {
            // 수정 로직 실행 (예: 저장 API 호출 등)
            console.log("수정 완료");
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
                            <P.Form>
                                {step === 1 ? <Edit /> : <Change />}
                            </P.Form>

                            <P.Button onClick={handleNext}>
                                {step === 1 ? "다음" : "수정"}
                            </P.Button>
                        </P.Profile>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default ProfileSettings;
