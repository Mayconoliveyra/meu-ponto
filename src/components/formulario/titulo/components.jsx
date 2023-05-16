import styled from "styled-components"

const TituloFormSC = styled.section`
    display: flex;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    padding: 12px 15px 14px 20px;

    @media (max-width: 720px){
        flex-direction: column;
        padding: 10px;
    }

    .div-icon-titulo{
        display: flex;
        h1{
            margin-left: 0.6rem;
            font-size: 1.3rem;
            margin-top: 0.3rem;
        }
    }
    .ol-li{
        display: flex;
        @media (max-width: 720px){
            margin-top: 0.5rem;
            background: #efefef;
            padding: 0.5rem 0.8rem;
            border-radius: 2px;
        }
        li{
            display: flex;
            align-items: center;
            font-size: 0.8rem;
            a{
                display: flex;
                align-items: center;
                padding: 0.3rem 0;
                padding-right: 0.4rem;
                color: #444;
                text-decoration: none;
            }
        }
        .ativo{
            color: #999999;
        }
    }
`;

const TituloForm = ({ title, icon, children }) => {
    return (
        <TituloFormSC>
            <div className="div-icon-titulo">
                {icon}
                <h1>{title}</h1>
            </div>
            <ol className="ol-li">
                {children}
            </ol>
        </TituloFormSC>
    )
}

export { TituloForm }