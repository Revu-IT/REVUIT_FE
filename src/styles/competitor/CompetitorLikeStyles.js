import styled from "styled-components";

export const Like = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-bottom: 83px;
`;

export const Emoji = styled.div`
    background-color: #f3f4f7;
    height: 254px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const EmojiImg = styled.img`
    height: 124px;
    width: auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 32px;
    font-weight: 600;
    color: #000000;
    font-stretch: expanded;

    span {
        color: #11bc3c;
    }
`;

export const Date = styled.div`
    font-family: "SF Pro";
    font-size: 10px;
    font-weight: 400;
    color: #969696;
    font-stretch: expanded;
    margin-top: 4px;
`;

export const Subtitle = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 400;
    color: #969696;
    font-stretch: expanded;
    margin-top: 10px;
`;

export const Line = styled.div`
    height: 3px;
    background: #f3f4f7;
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-right: -24px;
    @media (hover: hover) and (pointer: fine) {
        width: 360px;
        margin-left: 0px;
    }
`;

export const RankingList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RankingItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
`;

export const RankNumber = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: #28a745;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    flex-shrink: 0;
`;
export const RankNumberBad = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: #f5bf28;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
    flex-shrink: 0;
`;
export const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    gap: 12px;
`;

export const CompanyLogo = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;

    img {
        width: 48px;
        height: 48px;
        object-fit: contain;
    }
`;

export const CompanyDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const CompanyName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

export const CompanyCategory = styled.div`
    font-size: 12px;
    color: #666;
`;

export const Rating = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    flex-shrink: 0;
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

export const LoadingText = styled.div`
    font-size: 16px;
    color: #666;
`;

export const ErrorMessage = styled.div`
    font-size: 12px;
    color: #e74c3c;
    margin-top: 4px;
`;

export const Con = styled.div`
    margin: 0;
    padding-left: 24px;
    padding-right: 24px;
    height: 91vh;
    img {
        margin-top: 10px;
    }
`;
