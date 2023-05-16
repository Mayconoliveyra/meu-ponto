import { useContext } from "react";
import styled from "styled-components"
import { List, DoorOpenFill } from "react-bootstrap-icons";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import TemplateContext from "../../../context/template";

const HeaderSC = styled.header`
    display: flex;
    align-items: center;
    background: #232F3F;
    color: #fff;
    .btn-nav{
        background: transparent;
        padding: 1rem;
    }
    .usuario{
        flex: 1;
        padding: 1rem;
        h2{
            font-size: 1rem;
            font-weight: bold;
        }
    }
    .btn-sair{
        padding: 1rem;
        display: flex;
        flex-direction: column;
        background: transparent;
    }
`
export default function Header() {
    const { template, setTemplate } = useContext(TemplateContext)
    const { data: session } = useSession()

    return (
        <HeaderSC>
            <button type="button" className="btn-nav" onClick={() => setTemplate({ ...template, showMenu: true })}>
                <List size={35} />
            </button>

            <div className="usuario">
                {session && session.nome && session.nome != 'Não informado' ?
                    <>
                        <h2>{session.nome.toUpperCase()}</h2>
                    </>
                    :
                    <>
                        <h2>NÃO INFORMADO</h2>
                    </>
                }
            </div>

            <button type="button" className="btn-sair" onClick={() => signOut()}>
                <DoorOpenFill size={25} />
            </button>
        </HeaderSC >
    )
}


