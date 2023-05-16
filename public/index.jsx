import styled from "styled-components"

const ContentSC = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    
    max-width:${({ maxwidth }) => maxwidth};
    margin:${({ margin }) => margin ? margin : "0 auto;"};
    padding:${({ padding }) => padding ? padding : "0.5rem;"};
    background:${({ bgWhite }) => bgWhite && "#fff;"};
    flex:${({ noFlex1 }) => noFlex1 && "0"};
    @media (min-width: 720px){
        box-shadow:${({ noShadow }) => noShadow ? "" : "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"};
    }

    [data="p-info"]{
        margin: 0.5rem;
        font-size: 1rem !important;
        a{
        text-decoration: underline;
        color: #0066c0;
        font-family:${({ theme }) => theme.font.family.medium};
        font-size: 0.9rem !important;
        }
    }
`
const ContentHeaderSC = styled.div`
    color: #0F1111;
    display: flex;
    align-items: center;
    margin:${({ margin }) => margin};
    padding:${({ padding }) => padding};
    background:${({ bgGray }) => bgGray && "#EAEDED;"};
    a{
        flex:1;
        display: flex;
        align-items: center;
    }
    [data="icon-left"]{
        font-size: 1rem;
        margin-right: 0.5rem;
        
    }  
    [data="h1-title"]{
        color: #0F1111;
        font-size: ${({ theme }) => theme.font.sizes.large};
        font-family: ${({ theme }) => theme.font.family.bold};
    }
    [data="h2-title"]{
            font-size: 1.3rem;
            font-family:${({ theme }) => theme.font.family.bold};
    }
`
const ContentBorderSC = styled.div`
    background: #FFFFFF;
    border: 1px #D5D9D9 solid;
    color: #0F1111;
    border-radius:${({ borderRadius }) => borderRadius};
    margin:${({ margin }) => margin};
    padding:${({ padding }) => padding};

    [data="title"]{
      h3{
        color: #0F1111;
        font-size: ${({ theme }) => theme.font.sizes.large};
        font-family: ${({ theme }) => theme.font.family.bold};
      }
    }

    [data="table-1"]{
        width: 100%;
        border-collapse: collapse;
        tr{
            td{
                padding: 0.3rem 0.4rem;
                font-size:1.2rem;
            }
            [data="td-value"]{
                text-align:right;
            }
            [data="td-bold"]{
                padding-top: 0.4rem;
                font-family: ${({ theme }) => theme.font.family.bold};
                color: #0F1111;
                font-size: 1.2rem;
            }
            [data="td-red"]{
                padding-top: 0.4rem;
                font-family: ${({ theme }) => theme.font.family.bold};
                color: #B12704;
                text-align:right;
                font-size: 1.2rem;
            }
        }
    }
    [data="font-1.2"]{
        font-size: 1.2rem;
    }
    [data="p-info"]{
        margin: 0.5rem;
        font-size: 1rem !important;
        a{
        text-decoration: underline;
        color: #0066c0;
        font-family:${({ theme }) => theme.font.family.medium};
        font-size: 0.9rem !important;
        }
    }
    [data="error"]{
        text-align: center;
        font-size: 1.4rem;
        color: #e72626;
        margin-top: 0.0rem;
        padding: 1rem 0.5rem;
        small{
            padding: 0px;
            margin: 0px;
        }
    }
`
/* DIV principal a ser exibido na tela, fica dentro da Main. */
const Content = ({ maxwidth, margin, padding, bgWhite, noShadow, noFlex1, children }) => {
    return (
        <ContentSC maxwidth={maxwidth} margin={margin} padding={padding} bgWhite={bgWhite} noShadow={noShadow} noFlex1={noFlex1} >
            {children}
        </ContentSC>
    )
}
const ContentBorder = ({ children, margin, padding, borderRadius }) => {
    return (
        <ContentBorderSC margin={margin} padding={padding} borderRadius={borderRadius}>
            {children}
        </ContentBorderSC>
    )
}
const ContentHeader = ({ children, margin, bgGray, padding }) => {
    return (
        <ContentHeaderSC margin={margin} padding={padding} bgGray={bgGray}>
            {children}
        </ContentHeaderSC>
    )
}

export { Content, ContentHeader, ContentBorder }