import styled from "styled-components";

const NavSC = styled.footer`
    display: flex;
    padding: 1.5rem;
    align-items: center;
    justify-content: center;
    color: #ccc;
    font-size: 11px;
`
export default function Footer() {
    const date = new Date();
    return (
        <NavSC>
            <span>© 2023-{date.getFullYear()}, Softconnect Tecnologia</span>
        </NavSC>
    )
}