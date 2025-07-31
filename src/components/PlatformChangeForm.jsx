import React from "react";
import * as P from "../styles/components/PlatformChangeFormStyle";

import temu from "../assets/images/temu.svg";
import gmarket from "../assets/images/gmarket.svg";
import elevenst from "../assets/images/11st.svg";
import coupang from "../assets/images/coupang.svg";
import ali from "../assets/images/ali.svg";
import checkmark from "../assets/images/checkmark.svg";
import checkmark2 from "../assets/images/checkmark_selected.svg";

function PlatformChangeForm() {
    return (
        <P.Platform>
            <P.Card>
                <P.Logo src={elevenst} />
                <P.Content>
                    <P.Title>11번가</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark} />
            </P.Card>
            <P.Card>
                <P.Logo src={ali} />
                <P.Content>
                    <P.Title>Aliexpress</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark} />
            </P.Card>
            <P.Card>
                <P.Logo src={coupang} />
                <P.Content>
                    <P.Title>쿠팡</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark2} />
            </P.Card>
            <P.Card>
                <P.Logo src={gmarket} />
                <P.Content>
                    <P.Title>G마켓</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark} />
            </P.Card>
            <P.Card>
                <P.Logo src={temu} />
                <P.Content>
                    <P.Title>TEMU</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark} />
            </P.Card>
        </P.Platform>
    );
}

export default PlatformChangeForm;
