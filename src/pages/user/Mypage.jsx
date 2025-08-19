import React from "react";
import { useNavigate } from "react-router-dom";
import * as C from "../../styles/CommonStyle";
import * as M from "../../styles/MypageStyle";

import Header from "../../components/Header";
import chevron from "../../assets/images/chevron_right.svg";
import headset from "../../assets/images/headset.svg";
import phone from "../../assets/images/phone.svg";

function Mypage() {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/mypage/profileSettings");
    };
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="마이페이지" />
                        <M.Mypage>
                            <M.Profile>
                                <M.Container>
                                    <M.Email>abc@email.com</M.Email>
                                    <M.Logout>로그아웃</M.Logout>
                                </M.Container>
                                <M.Desc>
                                    <span>TEMU</span>의 리뷰를 보고 있네요. 어떤
                                    이야기가 담겨 있을까요?
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
