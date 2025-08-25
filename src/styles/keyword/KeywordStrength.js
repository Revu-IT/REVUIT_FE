import styled from "styled-components";

export const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 24px;
`;

export const EmojiIcon = styled.img`
    height: 124px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 41px;
    margin-bottom: 0;
`;

export const DetailTitle = styled.h1`
    font-family: "SF-Pro";
    font-size: 32px;
    font-stretch: expanded;
    text-align: center;
    font-weight: 700;
    margin-top: 65px;
    margin-bottom: 0;
`;

export const GreenText = styled.span`
    color: #28a745;
`;
export const YText = styled.span`
    color: #f5bf28;
`;

export const StatText = styled.span`
    font-size: 17px;
    color: #969696;
    font-family: "SF Pro";
    font-weight: 500;
    font-stretch: expanded;
    margin-top: 12px;
    margin-bottom: 63px;
`;

export const StatBadge = styled.div`
    background-color: #007aff;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
`;

export const ReviewList = styled.div`
    width: 100%;
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
    border: 1px solid #ffffff;
`;

export const ReviewHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

export const KeywordTag = styled.div`
    color: #28a745;
    padding: 6px 5px;
    border-radius: 16px;
    font-size: 15px;
    font-weight: 600;
    font-family: "SF Pro";
`;

export const MoreButton = styled.button`
    background: none;
    border: none;
    color: #999;
    font-size: 12px;
    margin-left: 180px;
    font-family: "SF Pro";
`;

export const ReviewContent = styled.p`
    font-size: 14px;
    color: #000000;
    line-height: 1.5;
    margin: 0;
    padding: 5px;
    font-weight: 400;
    font-family: "SF Pro";
`;

export const NextButton = styled.button`
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
