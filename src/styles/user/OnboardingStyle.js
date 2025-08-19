import styled from "styled-components";

export const Onboarding = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 227px;
`;

export const LogoImg = styled.img`
    height: 210px;
    width: auto;
`;

export const LogoTitle = styled.div`
    font-family: "SF-Pro";
    font-weight: 600;
    font-size: 17px;
    text-align: center;
    margin-top: 12px;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const SignupButton = styled.button`
    font-family: "SF-Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    width: calc(100% - 48px);
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
    margin-bottom: 20px;
`;

export const SiginButton = styled.div`
    font-family: "SF-Pro";
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 58px;
    color: #969696;
`;
