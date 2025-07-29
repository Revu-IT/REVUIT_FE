import styled from "styled-components";

export const ReviewCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 18px 24px 8px 24px;
    margin-bottom: 16px;
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
`;

export const Content = styled.div`
    font-weight: 400;
    text-align: left;
    font-size: 12px;
    color: #000000;
    font-family: "SF Pro";
    letter-spacing: -0.43px;
`;

export const Info = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

export const Score = styled.div`
    display: flex;
    flex-direction: row;
`;

export const InfoText = styled.div`
    font-weight: 400;
    text-align: left;
    font-size: 12px;
    color: #969696;
    font-family: "SF Pro";
    letter-spacing: -0.43px;
`;

export const InfoImg = styled.img`
    height: 12px;
    width: auto;
    margin-right: 4px;
`;
