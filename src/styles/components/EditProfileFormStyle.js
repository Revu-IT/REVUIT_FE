import styled from "styled-components";

export const Edit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
    width: 100%;
`;

export const Label = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 600;
    color: #000000;
    margin-bottom: 12px;
`;

export const Input = styled.input`
    width: 100%;
    height: 54px;
    padding: 16px;
    box-sizing: border-box;
    background-color: #f3f4f7;
    border: none;
    border-radius: 16px;
    font-size: 17px;
    font-family: "SF Pro";
    font-weight: 400;
    color: #000000;

    &::placeholder {
        color: rgba(60, 60, 67, 0.3);
    }

    &:focus {
        outline: none;
    }
`;
