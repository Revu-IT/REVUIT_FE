import styled from "styled-components";

export const ReviewSummary = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 19px 0;
`;

export const BarContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 5px 0;
    width: 100%;
`;

export const BackgroundBar = styled.div`
    background-color: #f3f4f7;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
`;

export const progressBar = styled.div`
    background-color: ${(props) => (props.isPositive ? "#11bc3c" : "#f5bf28")};
    width: ${(props) => props.width}%;
    height: 100%;
    color: white;
    font-weight: 600;
    font-size: 12px;
    padding-left: 12px;
    font-family: "SF Pro";
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: width 1s ease;
    overflow: hidden;
    position: relative;
`;

export const BarText = styled.span`
    color: white;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transform: ${(props) =>
        props.visible ? "translateX(0)" : "translateX(-10px)"};
    transition: opacity 1s ease, transform 1s ease;
    white-space: nowrap;
`;

export const Count = styled.div`
    font-size: 10px;
    color: #999999;
    min-width: 50px;
    text-align: right;
    font-family: "SF Pro";
    font-weight: 500;
    margin-right: 12px;
    margin-left: auto;
`;
