import styled from "styled-components";

export const Card = styled.div`
    background: #ffffff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(0, 0, 0, 0.08);
    margin: 24px 0;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

export const Title = styled.h3`
    margin: 0;
    font-family: "SF Pro";
    font-weight: 700;
    font-size: 17px;
    color: #000000;
`;

export const Legend = styled.div`
    display: inline-flex;
    gap: 16px;
    align-items: center;
`;

export const LegendItem = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "SF Pro";
    font-size: 10px;
    white-space: nowrap;
`;

export const Dot = styled.span`
    display: inline-block;
    width: 12px;
    height: 12px;
`;

export const ChartWrap = styled.div`
    width: 100%;
    height: 220px;
`;

export const Empty = styled.div`
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000000;
    font-size: 14px;
    background: #fafbfc;
    border-radius: 12px;
`;
