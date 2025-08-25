import styled from "styled-components";

export const Nav = styled.div`
    position: fixed;
    bottom: 0;
    height: 83px;
    background: rgba(255, 255, 255, 0.75);
    border-top: 0.33px solid rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    z-index: 100;
    /* 모바일에선 꽉 차게, 데스크톱에선 360px로 클램프 */
    width: 100vw;
    max-width: 360px;
    height: 83px;
    left: 50%; /* ✅ 가운데 기준 */
    transform: translateX(-50%); /* ✅ 가로 중앙 정렬 */
`;

export const NavItem = styled.div`
    font-family: "SF-Pro";
    font-weight: 500;
    cursor: pointer;
    font-size: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${({ selected }) => (selected ? "#007bff" : "#999999")};

    img {
        height: 21px;
        margin-bottom: 6px;
    }
`;
