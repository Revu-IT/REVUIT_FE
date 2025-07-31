import React from "react";
import * as C from "../../styles/CommonStyle";
import * as P from "../../styles/ProfileSettingsStyle";

import Header from "../../components/Header";
import Edit from "../../components/EditProfileForm";
import Change from "../../components/PlatformChangeForm";

function ProfileSettings() {
    return (
        <>
            <C.Page>
                <C.Center>
                    <C.PageSpace>
                        <Header Title="마이페이지" />
                        <P.Profile>
                            <P.Title>
                                <span>회원정보</span>를 <br></br>입력해주세요.
                            </P.Title>
                            <P.Form>
                                <Edit />
                            </P.Form>
                            <P.Button>다음</P.Button>
                        </P.Profile>
                    </C.PageSpace>
                </C.Center>
            </C.Page>
        </>
    );
}

export default ProfileSettings;
