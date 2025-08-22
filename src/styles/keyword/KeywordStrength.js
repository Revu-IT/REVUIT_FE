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

/*여기부터 */

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
`;

export const EmojiIcon = styled.div`
    font-size: 60px;
    margin: 20px 0;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const DetailTitle = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: #333;
    text-align: center;
    line-height: 1.4;
    margin: 10px 0px 10px 0px;
`;

export const GreenText = styled.span`
    color: #28A745;
`;

export const StatContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
`;

export const StatText = styled.span`
    font-size: 14px;
    color: #666;
`;

export const StatBadge = styled.div`
    background-color: #007AFF;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

export const ReviewList = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 80px;
`;

export const ReviewItem = styled.div`
    background-color: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
`;

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

export const KeywordTag = styled.div`
    color: #28A745;
    padding: 6px 5px;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 600;
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    color: #999;
    font-size: 12px;
        margin-left:180px;

`;

export const ReviewContent = styled.p`
    font-size: 14px;
    color: #333;
    line-height: 1.5;
    margin: 0;
    padding: 5px;
`;

export const NextButton = styled.button`
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