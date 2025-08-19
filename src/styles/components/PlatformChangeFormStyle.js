import styled from "styled-components";

export const Platform = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Card = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 76x;
    border: none;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    margin-bottom: 18px;
    padding: 14px 24px;
    align-items: center;
`;

export const Logo = styled.img`
    width: 48px;
    height: 48px;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 18px;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 700;
    font-stretch: expanded;
    color: #000000;
`;

export const Subtitle = styled.div`
    font-family: "SF Pro";
    font-size: 10px;
    font-weight: 400;
    font-stretch: expanded;
    color: #969696;
    margin-top: 4px;
`;

export const Check = styled.img`
    height: 17.24px;
    width: auto;
    justify-self: flex-end;
    margin-left: auto;
`;
