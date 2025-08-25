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
    width: 100vw;
    left: 0;

    @media (hover: hover) and (pointer: fine) {
        width: 360px;
        width: 100vw;
        max-width: 360px;
        left: 50%;
        transform: translateX(-50%);
    }
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
