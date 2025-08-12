import styled from "styled-components";
export const TabsWrap = styled.div`
    display: flex;
    width: 100%;
    padding: 8px 0;
    border-bottom: 3px solid #f3f4f7;
`;

export const Tab = styled.button`
    flex: 1 0 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: 0;
    cursor: pointer;

    font-family: "SF Pro";
    font-size: 17px;
    font-weight: ${(p) => (p.$active ? 700 : 500)};
    color: ${(p) => (p.$active ? "#000000" : "#969696")};
    font-stretch: expanded;

    position: relative;
    &::after {
        content: "";
        position: absolute;
        left: 50%;
        bottom: -11px;
        width: 76px;
        height: 3px;
        border-radius: 8px;
        background: #000000;
        transform: translateX(-50%) scaleX(${(p) => (p.$active ? 1 : 0)});
        transform-origin: center;
        transition: transform 180ms ease;
    }
`;
