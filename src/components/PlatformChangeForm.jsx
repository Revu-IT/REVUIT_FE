// components/PlatformChangeForm.jsx
import React from "react";
import * as P from "../styles/components/PlatformChangeFormStyle";
import { companyMap } from "../utils/companyMap";

import check from "../assets/images/checkmark.svg";
import checkSelected from "../assets/images/checkmark_selected.svg";

function PlatformChangeForm({ selectedCompanyId, onSelect, disabled = false }) {
    const items = Object.entries(companyMap).map(([id, info]) => ({
        id: Number(id),
        title: info.display,
        logo: info.logo,
    }));

    return (
        <P.Platform>
            {items.map(({ id, title, logo }) => {
                const active = id === selectedCompanyId;
                return (
                    <P.Card
                        key={id}
                        role="button"
                        aria-pressed={active}
                        onClick={() => !disabled && onSelect?.(id)}
                        style={{
                            opacity: disabled ? 0.6 : 1,
                            cursor: disabled ? "not-allowed" : "pointer",
                        }}
                    >
                        <P.Logo src={logo} alt={title} />
                        <P.Content>
                            <P.Title>{title}</P.Title>
                            <P.Subtitle>플랫폼</P.Subtitle>
                        </P.Content>
                        <P.Check
                            src={active ? checkSelected : check}
                            alt={active ? "선택됨" : "미선택"}
                        />
                    </P.Card>
                );
            })}
        </P.Platform>
    );
}

export default PlatformChangeForm;
