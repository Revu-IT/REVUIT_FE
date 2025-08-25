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
export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 120px;
    margin-left: 20px;
    margin-right: 20px;
    height: 50px;
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

export const ValidationIcon = styled.div`
    position: absolute;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "SF-Pro";
`;

export const ErrorMessage = styled.div`
    font-size: 12px;
    color: #ff4444;
    margin-top: 4px;
    padding-left: 4px;
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
export const SubmitButton = styled.button`
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
    margin-top: 30px;
    font-family: "SF-Pro";
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
    }
`;

export const ClickBox = styled(SubmitButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "SF-Pro";

    div {
        font-family: "SF Pro";
        font-size: 17px;
        font-weight: 500;
        font-stretch: expanded;
        color: #007bff;
        align-self: flex-end;
        margin-top: auto;
        font-family: "SF-Pro";
    }
`;

// Signup2용 추가 스타일 컴포넌트들
export const BlueText = styled.span`
    color: #007aff;
    font-family: "SF-Pro";
`;

export const CompanyList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 120px;
    font-family: "SF-Pro";
`;

export const CompanyItem = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #ffffff;
    border: 2px solid ${(props) => (props.selected ? "#007AFF" : "#f0f0f0")};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: "SF-Pro";

    &:hover {
        border-color: ${(props) => (props.selected ? "#007AFF" : "#ddd")};
        background-color: ${(props) => (props.selected ? "#f8fbff" : "#f9f9f9")};
    }
`;

export const CompanyLogo = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: ${(props) => props.color || "#f0f0f0"};
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
    font-family: "SF-Pro";
`;

export const CompanyName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #333;
    font-family: "SF-Pro";
`;

export const CompanyCategory = styled.div`
    font-size: 14px;
    color: #666;
    font-family: "SF-Pro";
`;

export const CheckIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid ${(props) => (props.selected ? "#007AFF" : "#E0E0E0")};
    background-color: ${(props) => (props.selected ? "#007AFF" : "transparent")};
    transition: all 0.2s ease;
`;
