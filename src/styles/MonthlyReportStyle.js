import styled from "styled-components";

export const Report = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px;
`;

export const Container = styled.ul`
    display: flex;
    flex-direction: column;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 78px;
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const Card = styled.div`
    padding: 18px 24px 8px 24px;
    box-sizing: border-box;
    width: 100%;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 24px;
    font-weight: 500;
    color: #000000;
    text-transform: capitalize;
    white-space: pre-line;
    align-self: flex-start;

    &::first-letter {
        color: #007bff;
    }
`;

export const Review = styled.div`
    margin-top: -3px;
    margin-bottom: -9px;
`;

export const Ai = styled.div`
    background-color: #f3f4f7;
    border-radius: 8px;
    width: 100%;
    padding: 18px 24px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: start;
`;

export const AiTitle = styled.div`
    font-family: "SF Pro";
    font-weight: 500;
    font-size: 12px;
    color: #000000;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    height: 100%;
`;

export const AiImg = styled.img`
    height: 18px;
    width: auto;
    margin-right: 4px;
`;

export const AiContent = styled.div`
    font-family: "SF Pro";
    font-weight: 400;
    font-size: 12px;
    color: #969696;
`;

export const Other = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
`;

export const Date = styled.div`
    font-family: "SF Pro";
    font-weight: 400;
    font-size: 10px;
    color: #969696;
    font-stretch: expanded;
`;

export const More = styled.div`
    font-family: "SF Pro";
    font-weight: 400;
    font-size: 10px;
    color: #007bff;
    font-stretch: expanded;
    text-align: right;
`;

export const Button = styled.button`
    font-family: "SF Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    width: auto;
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
    align-self: flex-end;
    margin-top: auto;
    position: fixed;

    left: 24px;
    right: 24px;
    bottom: 24px;
    z-index: 10;
    @media (hover: hover) and (pointer: fine) {
        width: 360px;
        width: 100vw;
        max-width: 312px;
        left: 50%;
        transform: translateX(-50%);
    }
`;
