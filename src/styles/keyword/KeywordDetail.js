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


/*여기부터 */
export const FixedHeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
`;

export const KeywordTitle = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0 30px 0;
    padding: 0 20px;
    
    .keyword-label {
        color: #00C73C;
        font-size: 24px;
        font-weight: bold;
    }
    
    .keyword-divider {
        margin: 0 8px;
        color: #333;
        font-size: 24px;
        font-weight: bold;
    }
    
    .keyword-name {
        color: #333;
        font-size: 24px;
        font-weight: bold;
    }
`;

export const EventList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
`;

export const EventCard = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
`;

export const EventText = styled.p`
    color: #333;
    font-size: 14px;
    line-height: 1.5;
    margin: 0 0 15px 0;
`;

export const EventFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const EventStats = styled.div`
    display: flex;
    gap: 15px;
`;

export const EventDate = styled.span`
    color: #999;
    font-size: 12px;
`;

export const ReviewSummary = styled.div`
    margin-top: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    text-align: center;
    margin: 30px 20px 20px 20px;
    
    p {
        margin: 5px 0;
        color: #666;
        font-size: 14px;
        
        &:first-child {
            font-weight: bold;
            color: #333;
        }
    }
`;

export const LoadingContainer = styled.div`
    text-align: center;
    padding: 50px 0;
    
    p {
        color: #666;
        font-size: 16px;
    }
`;

export const ErrorContainer = styled.div`
    text-align: center;
    padding: 50px 0;
    
    p {
        color: #f44336;
        font-size: 16px;
        margin-bottom: 20px;
    }
    
    button {
        background-color: #00C73C;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        
        &:hover {
            background-color: #00a832;
        }
    }
`;

export const EmptyContainer = styled.div`
    text-align: center;
    padding: 50px 0;
    
    p {
        color: #999;
        font-size: 16px;
        margin-bottom: 20px;
    }
    
    button {
        background-color: #666;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        
        &:hover {
            background-color: #555;
        }
    }
`;