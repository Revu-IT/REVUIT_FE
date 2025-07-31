import styled from "styled-components";

export const Profile = styled.div`
    margin: 24px 24px 42px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 86vh;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 32px;
    font-weight: 500;
    font-stretch: expanded;
    color: #000000;
    align-self: flex-start;

    span {
        color: #007aff;
    }
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    width: 100%;
`;

export const Button = styled.button`
    font-family: "SF Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
    align-self: flex-end;
    margin-top: auto;
`;
