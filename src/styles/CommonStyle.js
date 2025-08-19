import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: ${(props) => props.bg || "#ffffff"};
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
`;

export const PageSpace = styled.div`
    width: 100vw;
    min-height: 100dvh;
    /* background-color: white; */
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
        0 8px 10px -6px rgba(0, 0, 0, 0.3);
    @media (hover: hover) and (pointer: fine) {
        width: 360px;
    }
`;
export const FixedHeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
`;

export const StatusCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 272px;
    /* width: 100%;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);*/
    font-family: "SF Pro";
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
    font-family: "SF Pro";
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
