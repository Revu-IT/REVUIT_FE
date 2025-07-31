import React from "react";
import * as P from "../styles/components/PlatformChangeFormStyle";

import temu from "../assets/images/temu.svg";
import checkmark from "../assets/images/checkmark.svg";
import checkmark2 from "../assets/images/checkmark_selected.svg";

function PlatformChangeForm() {
    return (
        <P.Platform>
            <P.Card>
                <P.Logo src={temu} />
                <P.Content>
                    <P.Title>TEMU</P.Title>
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
            <P.Card>
                <P.Logo src={temu} />
                <P.Content>
                    <P.Title>TEMU</P.Title>
                    <P.Subtitle>플랫폼</P.Subtitle>
                </P.Content>
                <P.Check src={checkmark2} />
            </P.Card>
            <P.Card>
                <P.Logo src={temu} />
                <P.Content>
                    <P.Title>TEMU</P.Title>
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
