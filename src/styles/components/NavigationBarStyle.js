import styled from "styled-components";

export const Nav = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 83px;
    background: rgba(255, 255, 255, 0.75);
    border-top: 0.33px solid rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    padding-top: 12px;
    z-index: 100;
`;

export const NavItem = styled.div`
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
