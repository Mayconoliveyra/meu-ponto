import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link"
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ArrowUp, ArrowDown, PeopleFill, ChevronRight, ExclamationTriangle } from "react-bootstrap-icons"
import moment from "moment/moment";
import 'moment/locale/pt-br'
moment.locale('pt-br')

export function horaFormatada(date) {
    if (!date) return ""
    return moment(date).format('HH:mm:ss DD/MM/YY')
}

export function horaForm(hr) {
    if (!hr) return ""
    const tamanho = hr.length


    if (tamanho == 9) return hr.slice(0, 6)
    if (tamanho == 8) return hr.slice(0, 5)

    return hr
}

import { TituloForm } from "../../components/formulario/titulo/components"
import { TabelaForm, ThForm, TdForm, VazioForm, PaginadorForm, TableVW } from "../../components/formulario/tabela/components";

import { api, dataHoraAtual } from "../../../global";

const prefix = "ponto"
const prefixRouter = "/pontos"
const pageDefault = { _sort: "data", _order: "ASC", _page: 1, _limit: 31, _dinicial: moment(dataHoraAtual()).subtract(7, 'days').format('YYYY-MM-DD'), _dfinal: moment(dataHoraAtual()).format('YYYY-MM-DD') }

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
        justify-content: center;
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
`
const CabecalhoFiltros = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    padding: 10px 14px;
    .div-inputs{
        @media (min-width: 720px){
            display: flex;
            div{
                flex: 1;
                margin: 0 5px;
            }
        }
    }
    .div-filtro{
        margin-top: 1rem;
        text-align: end;
    }
    label {
        color: #333333 !important;
        font-size: 12px !important;
        font-weight: bold;
        white-space: nowrap;
        margin-bottom: 0px;
    }
    input, select {
        margin-top: 2px;
        display: block;
        width: 100%;
        height: 34px;
        padding: 6px 12px;
        font-size: 13px;
        color: #555555;
        background-color: #ffffff;
        background-image: none;
        border: 1px solid #cccccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

        &:focus{
            border-color: #0C1B25 !important;
        }
        &:disabled {
            background-color: #e9ecef;
            opacity: 1;
        }
    }
    button{
        font-size: 0.8rem;
        color: #ffffff;
        padding: 0.45rem 1rem;
        background-color: #212529;
        border-color: #212529;
        &:hover{
            background-color: #424649;
            border-color: #373b3e;
        }
    }
`
export default function Ponto({ session, data, totalPags }) {
    const [pageData, setPageData] = useState(data); /* Armazena todos dados a ser exibido na tabela */
    const [pageTotalPags, setPageTotalPags] = useState(totalPags); /* Armazena total de pags */
    const [pageHandle, setPageHandle] = useState(pageDefault); /* Armazena os atributos para filtro(_page, _limit,  _search...) */
    const [loadPage, setLoadPage] = useState(false); /* Desabilita os filtros até que os dados seja retornados do backend */

    const [dataVW, setDataVW] = useState({}); /* Amazena o registro para ser exibido no modal */

    const [dInicial, setDInicial] = useState(pageDefault._dinicial);
    const [dFinal, setDFinal] = useState(pageDefault._dfinal);

    /* MODAL */
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDataVW({})
        setShow(false);
    }
    const handleShow = (data) => {
        setDataVW(data)
        setShow(true);
    }

    const handlePageFilter = async () => {
        if (loadPage) {
            setLoadPage(false)

            const axios = await api(session);
            const params = `?_page=${pageHandle._page}&_limit=${pageHandle._limit}&_sort=${pageHandle._sort}&_order=${pageHandle._order}&_dinicial=${pageHandle._dinicial}&_dfinal=${pageHandle._dfinal}`
            const { data, totalPags } = await axios.get(`/ponto${params} `).then((res) => res.data)
            setPageData(data)
            setPageTotalPags(totalPags)

            setLoadPage(true)
        }
    };

    const handleInputSearch = (e) => {
        if (e == 'Search' || e.key === 'Enter') {
            if (!dInicial) toast.error("Data inical deve ser informada.")
            if (!dFinal) toast.error("Data final deve ser informada.")

            setPageHandle({ ...pageDefault, _dinicial: dInicial, _dfinal: dFinal })
        }
    };

    const OrdeByTable = (nomeExibir, columnDb) => {
        return (
            <button type="button" onClick={() => setPageHandle({ ...pageDefault, _sort: columnDb, _order: pageHandle._order == "DESC" ? "ASC" : "DESC", _dinicial: pageHandle._dinicial, _dfinal: pageHandle._dfinal })}>
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


    useEffect(() => {
        handlePageFilter()
    }, [pageHandle])

    useEffect(() => {
        setLoadPage(true)
    }, [pageHandle])
    return (
        <>
            <Head>
                <title>{`Listar ${prefix} - Softconnect Tecnologia`}</title>
            </Head>
            <Main>
                <TituloForm title={`Listar ${prefix}s`} icon={<PeopleFill size={25} />}>
                    <li>
                        <Link href="/">Início <ChevronRight height={10} /></Link>
                    </li>
                    <li>
                        <Link href={prefixRouter}>{`${prefix[0].toUpperCase() + prefix.substring(1)}s`} <ChevronRight height={10} /></Link>
                    </li>
                    <li className="ativo">
                        Listar
                    </li>
                </TituloForm>

                <CabecalhoFiltros>
                    <div className="div-inputs">
                        <Form.Group controlId="data-inicial">
                            <Form.Label>Data inicial</Form.Label>
                            <Form.Control value={dInicial} onChange={(e) => setDInicial(e.target.value)} type="date" />
                        </Form.Group>
                        <Form.Group controlId="data-final">
                            <Form.Label>Data final</Form.Label>
                            <Form.Control value={dFinal} onChange={(e) => setDFinal(e.target.value)} type="date" />
                        </Form.Group>
                    </div>
                    <div className="div-filtro">
                        <button type="button" onClick={() => handleInputSearch('Search')}>Pesquisar</button>
                    </div>
                </CabecalhoFiltros>
                {
                    pageData && pageData.length > 0 ?
                        <TabelaForm>
                            <table>
                                <thead>
                                    <tr>
                                        <ThForm maxwidth="120px">
                                            {OrdeByTable("Data", "data")}
                                        </ThForm>
                                        <ThForm maxwidth="120px">
                                            {OrdeByTable("Ent. 1", "entrada1")}
                                        </ThForm>
                                        <ThForm maxwidth="130px">
                                            {OrdeByTable("Saí. 1", "saida1")}
                                        </ThForm>
                                        <ThForm maxwidth="120px">
                                            {OrdeByTable("Ent. 2", "entrada2")}
                                        </ThForm>
                                        <ThForm maxwidth="130px">
                                            {OrdeByTable("Saí. 2", "saida2")}
                                        </ThForm>
                                        <ThForm maxwidth="9999px">
                                            {OrdeByTable("H. T.", "dif_total")}
                                        </ThForm>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.map((data => {
                                        return (
                                            <tr key={data.id} onClick={() => handleShow(data)}>
                                                <TdForm maxwidth="120px">{moment(data.data).format('DD/MM/YY')}</TdForm>
                                                <TdForm maxwidth="120px">{horaForm(data.entrada1)}</TdForm>
                                                <TdForm maxwidth="130px">{horaForm(data.saida1)}</TdForm>
                                                <TdForm maxwidth="120px">{horaForm(data.entrada2)}</TdForm>
                                                <TdForm maxwidth="130px">{horaForm(data.saida2)}</TdForm>
                                                <TdForm maxwidth="9999px">{data.dif_total ? horaForm(data.dif_total) : data.obs}</TdForm>
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
                                                Data
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {moment(dataVW.data).format('DD/MM/YY')}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 className="h4-titulo">1º TURNO</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Entrada
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.entrada1)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Saída
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.saida1)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Total
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.e1_s1)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 className="h4-titulo">2º TURNO</h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Entrada
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.entrada2)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Saída
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.saida2)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Total
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.e2_s2)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4 className="h4-titulo"></h4>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Acrescentado
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.acrescentar_hrs)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Subtraído
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {horaForm(dataVW.subtrair_hrs)}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className="span-th-vw">
                                                Total do dia
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.dif_total ? horaForm(dataVW.dif_total) : dataVW.obs}
                                            </span>
                                        </td>
                                    </tr>

                                    {dataVW.calendario_texto &&
                                        <tr>
                                            <th>
                                                <span className="span-th-vw">
                                                    Calendário
                                                </span>
                                            </th>
                                            <td>
                                                <span className="span-td-vw">
                                                    {dataVW.calendario_texto}
                                                </span>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </TableVW>
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
        if (session && session.id) {
            const axios = await api(session);
            const params = `?_page=${pageDefault._page}&_limit=${pageDefault._limit}&_sort=${pageDefault._sort}&_order=${pageDefault._order}&_dinicial=${pageDefault._dinicial}&_dfinal=${pageDefault._dfinal}`
            const { data, totalPags } = await axios.get(`/ponto${params}`).then((res) => res.data)

            return {
                props: { session, data: data, totalPags: Math.ceil(totalPags / pageDefault._limit) },
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