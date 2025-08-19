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


export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 120px;
    margin-left:20px;
    margin-right:20px;
    height:50px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const InputLabel = styled.label`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 8px;
`;

export const InputField = styled.input`
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
    
    &:disabled {
        background-color: #e9ecef;
        color: #6c757d;
        cursor: not-allowed;
    }
`;

export const SubmitButton = styled.button`
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

export const ClickBox = styled(SubmitButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    
    div {
        font-size: 16px;
        font-weight: 600;
    }
`;

// Signup2용 추가 스타일 컴포넌트들
export const BlueText = styled.span`
    color: #007AFF;
`;

export const CompanyList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 120px;
        margin-left:20px;
    margin-right:20px;
`;

export const CompanyItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    border: 2px solid ${props => props.selected ? '#007AFF' : '#f0f0f0'};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
   
`;

export const CompanyLogo = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-right: 16px;
    flex-shrink: 0;
`;

export const CompanyInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const CompanyName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
`;

export const CompanyCategory = styled.div`
    font-size: 14px;
    color: #666;
`;

export const CheckIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
`;

