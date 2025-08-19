import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 18px;
    height: 50px;
    margin-bottom: 24px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const Arrow = styled.div`
    width: 18.5px;
    cursor: pointer;
`;

export const Title = styled.div`
    font-weight: 600;
    text-align: center;
    font-size: 17px;
    line-height: 22px;
    color: #000000;
    font-family: "SF Pro";
    font-stretch: expanded;
    font-weight: 600;
`;

export const Help = styled.div`
    width: 20.28px;
    cursor: pointer;
`;
