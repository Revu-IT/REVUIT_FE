import styled from "styled-components";

export const Home = styled.div`
    display: flex;
    flex-direction: column;
    margin: 24px;
`;

export const Monthly = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-size: 17px;
    font-family: "SF Pro";
    font-weight: 600;
    color: #000000;
    display: flex;
    align-items: center;
    height: 100%;
`;

export const More = styled.img`
    height: 16.96px;
    width: auto;
    margin-left: 5px;
`;

export const StatusCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 272px;
    width: 100%;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    color: #000000;
    font-weight: 600;
    margin: 24px 0;
`;

export const ErrorCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 272px;
    width: 100%;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-weight: 600;
    color: #f5bf28;
    margin: 24px 0;
`;

export const Spinner = styled.div`
    width: 20px;
    height: 20px;
    border: 3px solid #e5e7eb;
    border-top-color: #007aff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 10px;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
