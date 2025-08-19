import styled from "styled-components";

export const Mypage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px 0 48px 0;
    width: 100%;
`;

export const Line = styled.div`
    width: 100vw;
    background-color: #f3f4f7;
    height: 3px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const Email = styled.div`
    font-family: "SF Pro";
    font-size: 24px;
    font-weight: 600;
    color: #000000;
    align-items: flex-start;
`;

export const Logout = styled.button`
    border: 1px solid #007bff;
    border-radius: 16px;
    background: none;
    color: #007bff;
    font-family: "SF Pro";
    font-size: 10px;
    font-weight: 400;
    font-stretch: expanded;
    padding: 6px 11px;
    box-sizing: border-box;
`;

export const Desc = styled.div`
    font-family: "SF Pro";
    font-size: 12px;
    font-weight: 400;
    margin-top: 10px;
    span {
        color: #007bff;
        font-weight: 500;
        text-decoration: underline;
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 17px 0;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.43px;
`;

export const NextButton = styled.img`
    height: 16.96px;
    width: auto;
`;

export const Support = styled.div`
    background-color: #f3f4f7;
    width: 100vw;
    box-sizing: border-box;
    padding: 24px 25px;
    height: 240px;
`;

export const SupTitle = styled.div`
    color: #969696;
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 12px;
`;

export const SupContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SupSection = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(50% - 12px);
`;

export const SupImg = styled.img`
    height: 18px;
    width: auto;
    margin-right: 8px;
`;

export const SupButton = styled.button`
    border: 1px solid #969696;
    border-radius: 8px;
    background: none;
    color: #969696;
    font-family: "SF Pro";
    font-size: 15px;
    font-weight: 400;
    font-stretch: expanded;
    padding: 9px 27px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SupDesc = styled.div`
    margin-top: 12px;
    font-family: "SF Pro";
    font-size: 12px;
    font-weight: 400;
    color: #969696;
    line-height: 22px;

    span {
        font-weight: 600;
    }
`;
