import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
    /* background-color: #000000; */
`;

export const Center = styled.div`
    display: flex;
    justify-content: center;
`;

export const PageSpace = styled.div`
    width: 100vw;
    min-height: 100dvh;
    background-color: #f5f5f5;
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

/*여기부터 */

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    min-height: calc(100vh - 200px);
`;

export const HashIcon = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;

export const TitleSection = styled.div`
    text-align: center;
    margin-bottom: 40px;
`;

export const MainTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #333;
    line-height: 1.4;
    margin: 0 0 12px 0;
`;

export const BlueText = styled.span`
    color: #007aff;
`;

export const Subtitle = styled.p`
    font-size: 14px;
    color: #999;
    margin: 0;
    font-weight: 400;
`;

export const KeywordGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, auto);
    gap: 12px;
    width: 100%;
    max-width: 300px;
    margin-bottom: 60px;
    min-height: 100px;
`;

export const KeywordItem = styled.div`
    background-color: white;
    color: black;
    border-radius: 20px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AnalyzeButton = styled.button`
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
