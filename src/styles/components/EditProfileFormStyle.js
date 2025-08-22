import styled from "styled-components";

export const Edit = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 32px;
    margin-bottom: 231px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
    width: 100%;
`;

/* ✅ 인풋만 감싸는 래퍼: 아이콘의 absolute 기준이 됩니다 */
export const InputWrap = styled.div`
    position: relative;
    width: 100%;
`;

export const Label = styled.div`
    font-family: "SF Pro";
    font-size: 17px;
    font-weight: 600;
    color: #000;
    margin-bottom: 12px;
`;

export const Input = styled.input`
    width: 100%;
    height: 54px;
    padding: 16px;
    box-sizing: border-box;
    background: #f3f4f7;
    border: none;
    border-radius: 16px;
    font-size: 17px;
    font-family: "SF Pro";
    font-weight: 400;
    color: #000;

    /* ✅ 아이콘과 겹치지 않게 우측 여유 */
    padding-right: 44px;

    &::placeholder {
        color: rgba(60, 60, 67, 0.3);
    }
    &:focus {
        outline: none;
    }
`;

export const ValidationIcon = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* 클릭 방해 방지 */

    img {
        width: 18px;
        height: 18px;
        display: block;
    }
`;

export const Error = styled.div`
    margin-top: 6px;
    color: #ff3b30;
    font-size: 12px;
`;
