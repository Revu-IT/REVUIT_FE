import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MypageStyle";

import api from "../../axios/instance";
import { getMyPage } from "../../axios/user";
import { companyMap } from "../../utils/companyMap";

import Header from "../../components/Header";
import chevron from "../../assets/images/chevron_right.svg";
import headset from "../../assets/images/headset.svg";
import phone from "../../assets/images/phone.svg";

function Mypage() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
        "email",
    ]);
    const [loggingOut, setLoggingOut] = useState(false);

    // 정보 조회
    const [email, setEmail] = useState("");
    const [companyInfo, setCompanyInfo] = useState(null);

    const handleEdit = () => {
        navigate("/mypage/profileSettings");
    };

    const handleLogout = () => {
        if (loggingOut) return;
        setLoggingOut(true);

        // 1) 토큰/쿠키 제거
        removeCookie("accessToken", { path: "/" });
        removeCookie("refreshToken", { path: "/" });
        removeCookie("email", { path: "/" });

        // 2) axios 기본 Authorization 헤더 정리
        if (api?.defaults?.headers?.common?.Authorization) {
            delete api.defaults.headers.common.Authorization;
        }

        // 3) 스토리지 정리 (에러 무시)
        sessionStorage.clear();
        localStorage.setItem("logout_broadcast", String(Date.now()));

        // 4) 로그인 페이지로
        navigate("/onboarding", { replace: true });

        setLoggingOut(false);
    };

    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                const data = await getMyPage();
                if (aborted) return;

                setEmail(data?.email ?? cookies.email ?? "");
                setCompanyInfo(companyMap?.[data?.company_id] ?? null);
            } catch (e) {
                if (aborted) return;
                if (e?.response?.status === 401) {
                    navigate("/onboarding", { replace: true });
                    return;
                }
                console.error(e);
            }
        })();
        return () => {
            aborted = true;
        };
    }, [navigate, cookies.email]);
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="마이페이지" />
                        <M.Mypage>
                            <M.Profile>
                                <M.Container>
                                    <M.Email>{email}</M.Email>
                                    <M.Logout onClick={handleLogout}>
                                        로그아웃
                                    </M.Logout>
                                </M.Container>
                                <M.Desc>
                                    <span>
                                        {companyInfo?.display ?? "내 회사"}
                                    </span>
                                    의 리뷰를 보고 있네요.
                                    <br /> 어떤 이야기가 담겨 있을까요?
                                </M.Desc>
                            </M.Profile>
                            <M.Line />
                            <M.Content style={{ margin: "16px 0" }}>
                                <M.Title>내 정보 수정</M.Title>
                                <M.NextButton
                                    src={chevron}
                                    onClick={handleEdit}
                                />
                            </M.Content>
                            <M.Line style={{ height: "20px" }} />
                            <M.Content style={{ marginTop: "24px" }}>
                                <M.Title>공지사항</M.Title>
                                <M.NextButton src={chevron} />
                            </M.Content>
                            <M.Content>
                                <M.Title>자주 찾는 질문</M.Title>
                                <M.NextButton src={chevron} />
                            </M.Content>
                            <M.Content>
                                <M.Title>설정</M.Title>
                                <M.NextButton src={chevron} />
                            </M.Content>
                            <M.Content style={{ marginBottom: "24px" }}>
                                <M.Title>회원탈퇴</M.Title>
                                <M.NextButton src={chevron} />
                            </M.Content>
                            <M.Support>
                                <M.SupTitle>리뷰잇 고객센터</M.SupTitle>
                                <M.SupContainer>
                                    <M.SupSection
                                        style={{ marginRight: "24px" }}
                                    >
                                        <M.SupButton>
                                            <M.SupImg src={headset} />
                                            1:1 문의하기
                                        </M.SupButton>
                                        <M.SupDesc>
                                            <span>1:1 문의</span>
                                            <br></br>
                                            24시간 365일 접수 가능
                                        </M.SupDesc>
                                    </M.SupSection>
                                    <M.SupSection>
                                        <M.SupButton>
                                            <M.SupImg src={phone} />
                                            1111-1111
                                        </M.SupButton>
                                        <M.SupDesc>
                                            <span>전화상담</span>
                                            <br></br>
                                            평일 9시 ~ 18시
                                            <br></br>
                                            주말﹒공휴일 11시 ~ 18시
                                        </M.SupDesc>
                                    </M.SupSection>
                                </M.SupContainer>
                            </M.Support>
                        </M.Mypage>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}
export default Mypage;
