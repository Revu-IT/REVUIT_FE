import styled from "styled-components";

export const Help = styled.div`
    margin: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f7;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

export const Title = styled.div`
    font-family: "SF Pro";
    font-size: 32px;
    font-weight: 500;
    font-stretch: expanded;
    color: #000000;

    span {
        color: #007bff;
    }
`;

export const Desc = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 500;
    font-stretch: expanded;
    color: #969696;
    margin-top: 12px;
    margin-bottom: 75px;
`;

export const Subtitle = styled.div`
    font-family: "SF Pro";
    font-size: 20px;
    font-weight: 500;
    font-stretch: expanded;
    color: #000000;
    margin-bottom: 12px;
    margin-top: 75px;

    span {
        color: #007bff;
    }
`;

export const ExampleImg = styled.img`
    width: ${(props) => props.width || "100%"};
    height: auto;
    object-fit: contain;
    display: block;
    margin: 0 auto;
`;

export const DepartmentButton = styled.button`
    font-family: "SF Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
    margin-bottom: 20px;
    margin-top: 47px;
`;
