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
`;
export const SubTitle = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #007AFF;
    line-height: 1.3;
    display:inline;
`;
export const SubTitle1 = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #007AFF;
    line-height: 1.3;
    margin: 40px 20px 0px 20px;

`;
export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 120px;
    margin-left:20px;
    margin-right:20px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const InputLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
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
    
    &::placeholder {
        color: #999;
        font-size: 14px;
    }

`;

export const LoginButton = styled.button`
    bottom: 40px;
    position: fixed;
    font-family: "SF Pro";
    font-weight: 600;
    font-size: 17px;
    color: #ffffff;
    text-align: center;
    box-sizing: border-box;
    width:65vw;
    height: 54px;
    border: none;
    background-color: #007bff;
    border-radius: 16px;
margin-left:10px;
margin-right:10px;


`;

// 기존 컴포넌트명 호환성을 위한 별칭
export const OneStepMore = styled(Title)``;
export const InputBox = styled(InputContainer)`
    b {
        font-size: 16px;
        font-weight: 600;
        color: #333;
        margin-bottom: 8px;
        display: block;
    }
    
    input {
        width: 100%;
        height: 56px;
        padding: 16px;
        border: none;
        background-color: #f8f9fa;
        border-radius: 12px;
        font-size: 16px;
        color: #333;
        
        &::placeholder {
            color: #999;
            font-size: 14px;
        }
        
        &:focus {
            outline: none;
            background-color: #f0f0f0;
            box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
        }
    }
`;

export const LoginClickBox = styled(LoginButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    
    
    div {
        font-size: 16px;
        font-weight: 600;
    }
`;