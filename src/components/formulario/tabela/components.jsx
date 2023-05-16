import styled from "styled-components"

const TabelaForm = styled.div`
    display: flex;
    padding: 15px 15px;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);

    /* Desabilita selecionar o texto. */
    -webkit-user-select:none;  
    -moz-user-select:none;     
    -ms-user-select:none;      
    user-select:none;  

    table {
        width: 100%;
        display: flex;
        flex-direction: column;

        tbody, thead {
            display: flex;
            flex-direction: column;
            border: 1px solid #dddddd;
            border-bottom: none;
            border-spacing: 0;
            background-color: #ffffff;
        }
        tbody{
            height: 100%;
        }
        tr{
            display: flex;
            td,th{
                display: flex;
                height: 37px;
                flex: 1;
                padding: 0 5px;
                border-right: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                text-align: left;
                font-size: 12px;
                cursor: pointer;
            }
            td:last-child{
                border-right: none;
            }
            th:last-child{
                border-right: none;
            }
        }
        tr:nth-child(odd) {
            background-color: #f3f4f5;
        }
        tr:hover{
            background-color: #DDDDDD !important;
        }
    }
    @media (max-width: 720px){
        padding: 5px;
    }
`
const ThForm = styled.th`
    padding: 8px 5px;
    max-width: 200px;
    align-items: center;
    background-color: #ffffff;
    color: #333333;
    border-bottom-width: 2px;

    span, a, button{
        box-sizing: border-box;
        color: #333333;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        background-color: transparent;
        svg{
            margin-bottom:3px;
        }
    }

    max-width: ${({ maxwidth }) => maxwidth} !important;
    min-width: ${({ minwidth }) => minwidth} !important;
    padding:${({ padding }) => padding} !important;
    background:${({ background }) => background} !important;
    color:${({ color }) => color} !important;
    font-size:${({ fontsize }) => fontsize} !important;
    font-weight:${({ fontweight }) => fontweight} !important;
`
const TdFormSC = styled.td`
    align-items: center;
    max-width: 200px;
    .span{
        text-overflow: ellipsis;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-word;
        line-height: 14px;
    }
    .acoes{
        display: flex;
        justify-content: center;
        width: 100%;
    }

    max-width: ${({ maxwidth }) => maxwidth} !important;
    min-width: ${({ minwidth }) => minwidth} !important;
    padding:${({ padding }) => padding} !important;
    background:${({ background }) => background} !important;
    color:${({ color }) => color} !important;
    font-size:${({ fontsize }) => fontsize} !important;
    font-weight:${({ fontweight }) => fontweight} !important;
`
/* Tabela de visualização de dados */
const TableVW = styled.div`
    display: flex;
    height: calc(100vh - 190px);
    table {
        color: #333333 !important;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
        tbody, thead {
            display: flex;
            flex-direction: column;
            border-spacing: 0;
            background-color: #ffffff;
        }
        tbody{
            overflow-x: hidden;
            height: 100%;
        }
        tr{
            display: flex;
            td,th{
                display: flex;
                align-items: center;
                height: 37px;
                flex: 1;
                padding: 0 10px;
                border: 1px solid #dddddd;
                border-bottom: none;
                border-right: none;
                font-size: 12px;
                line-height: 14px;

                .span-th-vw{
                    font-weight: bold;
                    text-overflow: ellipsis;
                    white-space: normal;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-word;
                }
                .span-td-vw{
                    text-overflow: ellipsis;
                    white-space: normal;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-break: break-word;
                }
                .h4-titulo{
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            th{
                max-width: 200px;
                @media (max-width: 720px){
                    max-width: 150px;
                }
            }
            td:last-child{
                border-right: 1px solid #dddddd;
            }
        }
        tr:last-child{
            border-bottom: 1px solid #dddddd;
        }
    }
`
const PaginadorForm = styled.div`
    display: flex;
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding: 10px 15px;
    padding-top: 20px;
    flex-wrap: wrap;
    button{
        margin-top: 3px;
        background: #fafafa;
        color: #666;
        box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);
        padding: 6px 14px;
        border: 1px solid #dddddd;
    }
    .active{
        background-color: #0C1B25;
        color: #ffffff;
        cursor: default;
    } 
`
const VazioForm = styled.div`
    flex: 1;
    display: flex;
    padding: 7px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
    text-align: center;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    color: #AAAAAA;
    .icon-vazio{
        display: flex;
        flex-direction: column;
    }
    h3{
        margin-top: 10px;
    }
`
const TdForm = ({ children, maxwidth, minwidth, padding, background, color, fontsize, fontweight, element }) => {
    return (
        <TdFormSC
            padding={padding}
            maxwidth={maxwidth} minwidth={minwidth}
            background={background} color={color}
            fontsize={fontsize} fontweight={fontweight}
            element={element}
        >
            {!element && (
                <span className="span">{children}</span>
            )}
            {element == "acoes" && (
                <div className="acoes">{children}</div>
            )}
        </TdFormSC>
    )
}

export { TabelaForm, ThForm, TdForm, TableVW, PaginadorForm, VazioForm }