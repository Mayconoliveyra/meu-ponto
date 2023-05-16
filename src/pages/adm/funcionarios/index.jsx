import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import router from "next/router"
import Link from "next/link"
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import { ArrowUp, ArrowDown, PeopleFill, ChevronRight, PlusCircleDotted, Search, ExclamationTriangle } from "react-bootstrap-icons"

import { TituloForm } from "../../../components/formulario/titulo/components"
import { CabecalhoForm } from "../../../components/formulario/cabecalho/components"
import { TabelaForm, ThForm, TdForm, VazioForm, PaginadorForm, TableVW } from "../../../components/formulario/tabela/components";

import { api, horaFormatada } from "../../../../global";
function showError(e) {
    if (e && e.response && e.response.data) {
        const type = typeof e.response.data

        /* Se o error retornado for uma string sera exibido no toast*/
        if (type === 'string') {
            toast.error(e.response.data)
        } else
            /* Se o error retornado for um objeto, sera retornado o objeto(normalmente utilizada no formik) */
            if (type === 'object') {
                return e.response.data
            }
    } else {
        toast.error("Não foi possível realizar a operação!. Por favor, atualize a página e tente novamente.")
    }
}

const prefix = "funcionário"
const prefixRouter = "/adm/funcionarios"
const pageDefault = { _sort: "id", _order: "DESC", _page: 1, _limit: 20, _search: "" }

const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0px;
    }

    .div-alterar{
        flex: 1;
        background: #fff;
        box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
        .div-exibir{
            max-width: 470px;
            margin: 0 auto;
            @media (max-width: 720px){
                padding: 1rem;
            }
            .div-h1{
                margin: 1.5rem auto;
                margin-bottom: 2rem;
                h1{
                    font-size: 1.4rem;
                    font-weight: bold;
                    text-align: center;
                }
            }
            .btn-alterar{
                margin: 0.5rem 0px;
                margin-top: 2rem;
                button{
                    display: flex;
                    align-items: center;
                    justify-content: center ;
                    color: #ffffff;
                    background: linear-gradient(to bottom,#f7dfa5,#f0c14b);
                    border-color: #a88734 #9c7e31 #846a29;
                    font-weight: bold;
                    font-size: 1rem;
                    padding:  0.7rem 0;
                    width: 100%;
                    text-transform: uppercase;
                    border-radius: 0.25rem;
                    color: #111;
                    box-shadow: 0 1px 0 rgb(#ffffff / 40%) inset;
                    border-style: solid;
                    border-width: 1px;
                }
            }
        }
    }
`
const ModalAcoes = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: calc(100vh);
    .modal-header{
        height: 53px !important;
        div,
        .btn-close{
            font-size: 16px !important;
        }
        .btn-close{
            padding: 0 10px !important;
        }
    }
    .div-acoes{
        height: 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        max-width: 600px;
        margin: 0 auto;
        width: 100%;
        button,a{
            padding: 7px;
            width: 35%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #ffffff;
            border-radius: 2px;
            font-weight: 600;
            letter-spacing: 1px;
            box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);
 
            &:disabled{
                cursor: default;
            }
            svg{
                margin-right: 4px;
            }
        }
        .btn-excluir-1{
            background-color: #ffc107;
            border-color: #ffc107;
            &:hover{
                background-color: #ffca2c;
                border-color: #ffc720;
            }
        }

        .btn-excluir{
            background-color: #dc3545;
            border-color: #dc3545;
            &:hover{
                background-color: #bb2d3b;
                border-color: #b02a37;
            }
        }
        .btn-editar{
            background-color: #198754;
            border-color: #198754;
            &:hover{
                background-color: #157347;
                border-color: #146c43;
            }
        }
    }
    .btn-redefinir-senha{
        background-color: red;
        padding: 3px 5px;
        border-radius: 3px;
        color: white;
        font-weight: bold;
    }
`
export default function AdmIndex({ session, data, totalPags }) {
    const [pageData, setPageData] = useState(data); /* Armazena todos dados a ser exibido na tabela */
    const [pageTotalPags, setPageTotalPags] = useState(totalPags); /* Armazena total de pags */
    const [pageHandle, setPageHandle] = useState(pageDefault); /* Armazena os atributos para filtro(_page, _limit,  _search...) */
    const [loadPage, setLoadPage] = useState(false); /* Desabilita os filtros até que os dados seja retornados do backend */

    const [dataVW, setDataVW] = useState({}); /* Amazena o registro para ser exibido no modal */
    const [inputSearch, setInputSearch] = useState('')
    const [btnExcluir, setBtnExcluir] = useState(10);
    const [btnDisabled, setBtnDisabled] = useState(false);

    /* MODAL */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDataVW({})
        setShow(false);
    }
    const handleShow = (data) => {
        setBtnExcluir(10)
        setDataVW(data)
        setShow(true);
    }

    const handlePageFilter = async () => {
        if (loadPage) {
            setLoadPage(false)

            const axios = await api(session);
            const params = `?_page=${pageHandle._page}&_limit=${pageHandle._limit}&_sort=${pageHandle._sort}&_order=${pageHandle._order}&_search=${pageHandle._search}`
            const { data, totalPags } = await axios.get(`/adm/funcionario${params} `).then((res) => res.data)
            setPageData(data)
            setPageTotalPags(totalPags)

            setLoadPage(true)
        }
    };

    const handleInputSearch = (e) => {
        if (e == 'Search' || e.key === 'Enter') {
            if (inputSearch) {
                setPageHandle({ ...pageDefault, _search: inputSearch })
            } else {
                /* Exibe os valores padrão do primeiro carregamento da página */
                setPageHandle({ ...pageDefault })
                setPageData(data)
                setPageTotalPags(totalPags)
            }
        }
    };

    const handleExcluir = async (id) => {
        setBtnDisabled(true)
        const axios = await api(session);
        await axios.delete(`/adm/funcionario/${id}`)
            .then(async () => {
                router.reload()
            })
            .catch((error) => showError(error))
        setBtnDisabled(false)
    }

    const OrdeByTable = (nomeExibir, columnDb) => {
        return (
            <button type="button" onClick={() => setPageHandle({ ...pageDefault, _sort: columnDb, _order: pageHandle._order == "DESC" ? "ASC" : "DESC", _search: pageHandle._search })}>
                {pageHandle._sort == columnDb &&
                    <>
                        {pageHandle._order == "DESC" ?
                            <ArrowUp />
                            :
                            <ArrowDown />
                        }
                    </>
                }
                {nomeExibir}
            </button>
        )
    }

    const handleRedefiniSenha = async (id) => {
        setBtnDisabled(true)
        const axios = await api(session);
        await axios.put(`/adm/funcionario/${id}?_defaltsenha=true`)
            .then(async () => {
                toast.success("A senha do funcionário foi redefinida com sucesso.")
            })
            .catch((error) => showError(error))
        setBtnDisabled(false)
    }
    /* Conta 10s antes de habilitar o btn vermelho de excluir */
    useEffect(() => {
        let intervalId = null
        if (btnExcluir <= 9 && btnExcluir > 0) {
            intervalId = setTimeout(() => {
                setBtnExcluir(btnExcluir - 1)
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [btnExcluir])

    useEffect(() => {
        handlePageFilter()
    }, [pageHandle])

    useEffect(() => {
        setLoadPage(true)
    }, [])
    return (
        <>
            <Head>
                <title>{`Listar ${prefix} - Softconnect Tecnologia`}</title>
            </Head>
            <Main>
                <TituloForm title={`Listar ${prefix}s`} icon={<PeopleFill size={25} />}>
                    <li>
                        <Link href="/dashboard">Início <ChevronRight height={10} /></Link>
                    </li>
                    <li>
                        <Link href={prefixRouter}>{`${prefix[0].toUpperCase() + prefix.substring(1)}s`} <ChevronRight height={10} /></Link>
                    </li>
                    <li className="ativo">
                        Listar
                    </li>
                </TituloForm>
                <CabecalhoForm>
                    <Link className="btn-adicionar" href={`${prefixRouter}/adicionar`}><PlusCircleDotted size={18} /><span>Adicionar</span></Link>
                    <div className="div-input-pesquisa">
                        <input value={inputSearch} onKeyUp={handleInputSearch} onChange={(e) => setInputSearch(e.target.value)} placeholder="Buscar" type="text" />
                        <button type="button" onClick={() => handleInputSearch('Search')}><Search size={18} /></button>
                    </div>
                </CabecalhoForm>

                {
                    pageData && pageData.length > 0 ?
                        <TabelaForm>
                            <table>
                                <thead>
                                    <tr>
                                        <ThForm maxwidth="65px">
                                            {OrdeByTable("Cód.", "id")}
                                        </ThForm>
                                        <ThForm maxwidth="100px">
                                            {OrdeByTable("CPF", "cpf")}
                                        </ThForm>
                                        <ThForm maxwidth="9999px">
                                            {OrdeByTable("Nome", "nome")}
                                        </ThForm>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((data => {
                                        return (
                                            <tr key={data.id} onClick={() => handleShow(data)}>
                                                <TdForm maxwidth="65px">{data.id}</TdForm>
                                                <TdForm maxwidth="100px">{data.cpf}</TdForm>
                                                <TdForm maxwidth="9999px">{data.nome}</TdForm>
                                            </tr>
                                        )
                                    }))}
                                </tbody>
                            </table>
                        </TabelaForm>
                        :
                        <VazioForm nome={prefix}>
                            <div className="icon-vazio">
                                <ExclamationTriangle size={75} />
                            </div>
                            <h3>Nenhum {prefix} foi encontrado(a)!</h3>
                        </VazioForm >
                }

                {
                    pageTotalPags > 1 &&
                    <PaginadorForm>
                        {(() => {
                            const links = [];
                            for (let page = 1; page <= pageTotalPags; page++) {
                                links.push(
                                    <button type="button" key={page} className={pageHandle._page == page ? 'active' : ''} onClick={() => setPageHandle({ ...pageHandle, _page: page })}> {page}</button>
                                );
                            }
                            return links;
                        })()}
                    </PaginadorForm>
                }

                <Modal fullscreen show={show} onHide={handleClose} animation={false}>
                    <ModalAcoes>
                        <Modal.Header className="modal-header" closeButton>
                            <Modal.Title>Visualizando</Modal.Title>
                        </Modal.Header>
                        <TableVW>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Código
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.id}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Nome
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.nome}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                E-mail
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.email}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                CPF
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.cpf}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                RG
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.rg}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Nascimento
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.data_nasc}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Contato
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.contato}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Sexo
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.sexo}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Bloqueado
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.bloqueado}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Motivo bloqueio
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.motivo_bloqueio}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Cadastrado em
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaFormatada(dataVW.created_at)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Modificado em
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaFormatada(dataVW.updated_at)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Redefinir senha
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                <button disabled={btnDisabled} onClick={() => handleRedefiniSenha(dataVW.id)} className="btn-redefinir-senha" type="button">Redefinir</button>
                                            </span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </TableVW>
                        <div className="div-acoes">
                            {btnExcluir >= 1 ?
                                <button onClick={() => setBtnExcluir(9)} disabled={btnExcluir != 10} className="btn-excluir-1" type="button">Excluir({btnExcluir}s)</button>
                                :
                                <button disabled={btnDisabled} className="btn-excluir" onClick={() => handleExcluir(dataVW.id)} type="button">EXCLUIR</button>
                            }
                            <Link className="btn-editar" href={`${prefixRouter}/editar/${dataVW.id}`}>Editar </Link>
                        </div>
                    </ModalAcoes>
                </Modal>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    try {
        if (session && session.id && session.adm) {
            const axios = await api(session);
            const params = `?_page=${pageDefault._page}&_limit=${pageDefault._limit}&_sort=${pageDefault._sort}&_order=${pageDefault._order}`
            const { data, totalPags } = await axios.get(`/adm/funcionario${params} `).then((res) => res.data)

            return {
                props: { session, data, totalPags: Math.ceil(totalPags / pageDefault._limit) },
            }
        }

        throw "FORÇA ERRO"
    } catch (error) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}