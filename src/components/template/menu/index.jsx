import { useContext } from "react"
import Image from "next/image";
import styled from "styled-components"
import { X } from "react-bootstrap-icons"
import Link from "next/link";

import TemplateContext from "../../../context/template"

const MenuSC = styled.aside`
    position: fixed;
    height:100vh;
    width: 100%;
    backdrop-filter: brightness(27%);
    z-index: 999;
    overflow: hidden;
    display: flex;

    .div-exibir{
        height: 100%;
        background-color: #fff;
        box-shadow: 4px 0 10px 0 rgb(0 0 0 / 40%);
        width: 22rem;

        .x-close{
            position: absolute;
            left: 22rem;
            svg{
              color: #f1f3f9;
              font-size: 3.5rem;
            }
        }

        .div-logo{
            background: #232F3E;
            padding: 1rem;
        }
        .ul-li{
            display: flex;
            flex-direction: column;
            li{
                display: flex;
                height: 3rem;
                padding:0px;

                .div-titulo{
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                a{ 
                    display: flex;
                    align-items: center;
                    padding: 15px 20px;
                    flex: 1;
                    font-size: 1rem;
                    color: #111;
                    margin-left: 8px;
                    font-weight: 500;
                }
            }
            .barra{
                border-bottom: 5px solid #d5dbdb;
                padding: 0px;
                margin: 0px;
                height: 0px;
                margin: 5px 0 0;
            }
        }
    }
    .btn-close{
        flex: 1;
        height: 100%;
        background: transparent;
        z-index: 999;
    }
`

export default function Menu({ session }) {
    const { template, setTemplate } = useContext(TemplateContext)
    return (
        <MenuSC>
            <div className="div-exibir">
                <div className='x-close'>
                    <X />
                </div>
                <div className="div-logo">
                    <Image src={'/assets/images/logo.png'} width={140} height={35} alt="Softconnect Tecnologia" quality={100} priority={true} />
                </div>
                <ul className="ul-li">
                    <li>
                        <div className="div-titulo">
                            Conta
                        </div>
                    </li>
                    <li><Link onClick={() => setTemplate({ ...template, showMenu: false })} href="/alteracaosenha">Alterar Senha</Link></li>
                    <li className="barra"></li>
                    <li>
                        <div className="div-titulo">
                            Ponto
                        </div>
                    </li>
                    <li><Link onClick={() => setTemplate({ ...template, showMenu: false })} href="/">Registrar Ponto</Link></li>
                    <li><Link onClick={() => setTemplate({ ...template, showMenu: false })} href="/pontos">Visualizar Ponto</Link></li>
                    {!!session.adm &&
                        <>
                            <li>
                                <div className="div-titulo">
                                    Administrador
                                </div>
                            </li>
                            <li><Link onClick={() => setTemplate({ ...template, showMenu: false })} href="/adm/funcionarios">Funcionários</Link></li>
                            <li><Link onClick={() => setTemplate({ ...template, showMenu: false })} href="/adm/pontos">Pontos</Link></li>
                        </>
                    }
                </ul>
            </div>

            <button className="btn-close" onClick={() => setTemplate({ ...template, showMenu: false })}>
            </button>
        </MenuSC >
    )
}