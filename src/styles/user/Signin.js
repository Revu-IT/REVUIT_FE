import styled from "styled-components";

export const Page = styled.div`
    width: 100vw;
    overflow-y: scroll;
    overflow-x: hidden;
    /* background-color: #000000; */
    font-family: "SF-Pro";
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

export const Title = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: black;
    line-height: 1.3;
    margin: 40px 20px 40px 20px;
    font-family: "SF-Pro";
`;
export const SubTitle = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #007aff;
    line-height: 1.3;
    display: inline;
    font-family: "SF-Pro";
`;
export const SubTitle1 = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #007aff;
    line-height: 1.3;
    margin: 40px 20px 0px 20px;
    font-family: "SF-Pro";
`;
export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 120px;
    margin-left: 20px;
    margin-right: 20px;
    font-family: "SF-Pro";
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-family: "SF-Pro";
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    font-family: "SF-Pro";
`;

export const InputLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
    font-family: "SF-Pro";
`;

export const InputField = styled.input`
    width: 100%;
    height: 35px;
    padding: 16px;
    border: none;
    background-color: #f8f9fa;
    border-radius: 12px;
    font-size: 16px;
    color: #333;
    font-family: "SF-Pro";

    &::placeholder {
        color: #999;
        font-size: 14px;
        font-family: "SF-Pro";
    }
`;

export const LoginButton = styled.button`
    font-family: "SF-Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
    margin-bottom: 20px;
    font-family: "SF-Pro";
`;
