import styled from "styled-components";

export const Monthly = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    background-color: #f3f4f7;
    border-radius: 16px;
    box-sizing: border-box;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    height: 142px;
    padding: 24px 24px 8px 24px;
    margin: 10px 0 24px 0;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;
`;

export const Face = styled.img`
    height: 85px;
    width: auto;
    opacity: 50%;
    z-index: 0;
    pointer-events: none;
    position: absolute;
    left: 45px;
    top: 28.5px;
    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
`;

export const Content = styled.div`
    position: relative;
    z-index: 1;
    width: 225px;
    align-self: flex-end;
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 600;
    color: #000000;
    text-align: center;

    span {
        color: #007aff;
    }
`;

export const Date = styled.div`
    align-self: flex-end;
    font-family: "SF Pro";
    font-size: 10px;
    font-weight: 400;
    font-stretch: expanded;
    color: #969696;
    justify-self: flex-end;
    line-height: 22px;
    margin-top: 8px;
`;

export const Tag = styled.div`
    font-family: "SF Pro";
    font-size: 12px;
    font-weight: 400;
    color: #969696;
`;
