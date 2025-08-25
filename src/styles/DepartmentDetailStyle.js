import styled from "styled-components";

export const Detail = styled.div`
    display: flex;
    flex-direction: column;
    margin: 74px 24px;
`;

export const title = styled.div`
    font-family: "SF Pro";
    font-size: 32px;
    font-weight: 500;
    font-stretch: expanded;
    color: #000000;
    text-transform: capitalize;
    white-space: pre-line;
    align-self: flex-start;

    &::first-letter {
        color: #007bff;
    }
`;

export const Line = styled.div`
    height: 3px;
    background: #f3f4f7;
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-right: -24px;
`;
