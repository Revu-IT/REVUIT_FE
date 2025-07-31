import React from "react";
import * as E from "../styles/components/EditProfileFormStyle";

function EditProfileForm() {
    return (
        <E.Edit>
            <E.Container>
                <E.Label>이메일 주소</E.Label>
                <E.Input
                    type="email"
                    inputMode="email"
                    placeholder="abc@email.com"
                />
            </E.Container>
            <E.Container>
                <E.Label>비밀번호</E.Label>
                <E.Input
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                />
            </E.Container>
            <E.Container>
                <E.Label>비밀번호 확인</E.Label>
                <E.Input
                    type="password"
                    placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                />
            </E.Container>
        </E.Edit>
    );
}

export default EditProfileForm;
