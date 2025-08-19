import styled from "styled-components";

export const Department = styled.div`
    margin: 74px 24px 107px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    height: 274px;
    background-color: #f3f4f7;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    padding: 24px 24px 14px 24px;
    border-radius: 16px;
    margin-bottom: 16px;
`;

export const Title = styled.div`
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

export const Desc = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 500;
    font-stretch: expanded;
    color: #969696;
    text-align: left;
    margin-top: 12px;
`;

export const ReviewButton = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 500;
    font-stretch: expanded;
    color: #007bff;
    align-self: flex-end;
    margin-top: auto;
`;
