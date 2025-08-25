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
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
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

export const CompetitorContainer = styled.div`
    padding: 0 20px 20px;
    background-color: white;
    min-height: calc(100vh - 60px);
`;

export const EmojiSection = styled.div`
    display: flex;
    justify-content: center;
    margin: 60px 0 40px 0;
    padding-top: 20px;
`;

export const LargeEmoji = styled.div`
    font-size: 80px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const TitleSection = styled.div`
    text-align: left;
    margin-bottom: 40px;
    padding-left: 4px;
`;

export const MainTitle = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #333;
    line-height: 1.2;
    margin: 0 0 12px 0;
    text-align: left;
    padding-left: 4px;
`;

export const GoodText = styled.span`
    color: #28a745;
`;
export const BadText = styled.span`
    color: #f5bf28;
`;
export const ThumbsUp = styled.span`
    font-size: 24px;
    margin: 0 4px;
`;

export const TimeStamp = styled.div`
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
    text-align: left;
`;

export const Description = styled.p`
    font-size: 14px;
    color: #666;
    margin: 0;
    text-align: left;
`;

export const RankingList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const RankingItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
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
    padding-left: 23px;
    padding-right: 23px;

    img {
        margin-top: 10px;
    }
`;
