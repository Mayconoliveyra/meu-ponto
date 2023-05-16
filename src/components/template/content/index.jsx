import Header from "../header"
import Footer from "../footer"
import styled from "styled-components"

const ContentSC = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export default function Content({ children }) {
    return (
        <>
            <Header />
            <ContentSC>
                {children}
            </ContentSC>
            <Footer />
        </>
    )
}