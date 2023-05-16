import Head from "next/head";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link"
import { getSession } from "next-auth/react";
import { toast } from "react-toastify";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ArrowUp, ArrowDown, PeopleFill, ChevronRight, ExclamationTriangle, FiletypePdf } from "react-bootstrap-icons"
import { Formik } from "formik";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);
import moment from "moment/moment";
import 'moment/locale/pt-br'
moment.locale('pt-br')

import { FormOne, GroupOne, GroupSelectOne } from "../../../components/formulario/form/components"
import { TituloForm } from "../../../components/formulario/titulo/components"
import { TabelaForm, ThForm, TdForm, VazioForm, PaginadorForm, TableVW } from "../../../components/formulario/tabela/components";

import { api, dataHoraAtual } from "../../../../global";
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
function horaForm(hr) {
    if (!hr) return ""
    const tamanho = hr.length


    if (tamanho == 9) return hr.slice(0, 6)
    if (tamanho == 8) return hr.slice(0, 5)

    return hr
}

const prefix = "ponto"
const prefixRouter = "/adm/pontos"
const pageDefault = { _sort: "data", _order: "ASC", _page: 1, _limit: 31, _dinicial: moment(dataHoraAtual()).format('YYYY-MM-DD'), _dfinal: moment(dataHoraAtual()).format('YYYY-MM-DD'), _funcionario: "Selecione" }

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
        display: flex;
        justify-content: space-between;
        .btn-pdf{
            padding: 0px 7px;
            background-color: transparent;
            color: red;
        }
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
/* VISUALIZAR */
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

/* PDF */
import { pontosPDF, pontosAssinaturaPDF } from "../../../../relatorios/pontos"
const schemePDF = Yup.object().shape({
    mes: Yup.string().nullable().label("Mês").required(),
    funcionario: Yup.string().nullable().label("Funcionário").required(),
});
const ModalPDF = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    form {
        margin-bottom: 0px !important;
    }
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
`

export default function AdmPonto({ session, data, totalPags, usuarios }) {
    const [pageData, setPageData] = useState(data); /* Armazena todos dados a ser exibido na tabela */
    const [pageTotalPags, setPageTotalPags] = useState(totalPags); /* Armazena total de pags */
    const [pageHandle, setPageHandle] = useState(pageDefault); /* Armazena os atributos para filtro(_page, _limit,  _search...) */
    const [loadPage, setLoadPage] = useState(false); /* Desabilita os filtros até que os dados seja retornados do backend */

    const [dInicial, setDInicial] = useState(pageDefault._dinicial);
    const [dFinal, setDFinal] = useState(pageDefault._dfinal);
    const [funcionario, setFuncionario] = useState(pageDefault._funcionario);

    /* VISUALIZAR */
    const [dataVW, setDataVW] = useState({}); /* Amazena o registro para ser exibido no modal */
    const [show, setShow] = useState(false);
    const handleShow = (data) => {
        setDataVW(data)
        setShow(true);
    }
    const handleClose = () => {
        setDataVW({})
        setShow(false);
    }

    /* PDF */
    const [show1, setShow1] = useState(false);
    const handleShow1 = () => {
        setShow1(true);
    }
    const handleClose1 = () => {
        setShow1(false);
    }


    const handlePageFilter = async () => {
        if (loadPage) {
            setLoadPage(false)

            const axios = await api(session);
            const params = `?_page=${pageHandle._page}&_limit=${pageHandle._limit}&_sort=${pageHandle._sort}&_order=${pageHandle._order}&_dinicial=${pageHandle._dinicial}&_dfinal=${pageHandle._dfinal}&_funcionario=${pageHandle._funcionario}`
            const { pontos, totalPags } = await axios.get(`adm/ponto${params} `).then((res) => res.data)
            setPageData(pontos)
            setPageTotalPags(totalPags)

            setLoadPage(true)
        }
    };

    const handleInputSearch = (e) => {
        if (e == 'Search' || e.key === 'Enter') {
            if (!dInicial) toast.error("Data inical deve ser informada.")
            if (!dFinal) toast.error("Data final deve ser informada.")

            setPageHandle({ ...pageDefault, _dinicial: dInicial, _dfinal: dFinal, _funcionario: funcionario })
        }
    };

    const OrdeByTable = (nomeExibir, columnDb) => {
        return (
            <button type="button" onClick={() => setPageHandle({ ...pageDefault, _sort: columnDb, _order: pageHandle._order == "DESC" ? "ASC" : "DESC", _dinicial: pageHandle._dinicial, _dfinal: pageHandle._dfinal, _funcionario: pageHandle._funcionario })}>
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

                        <Form.Group controlId="funcionario">
                            <Form.Label>Funcionário</Form.Label>
                            <Form.Select onChange={(e) => setFuncionario(e.target.value)} type="select">
                                <option>Selecione</option>
                                {usuarios && usuarios.length > 0 && (
                                    usuarios.map(data => {
                                        return (
                                            <option key={data.value} value={data.value}>{data.name}</option>
                                        )
                                    })
                                )
                                }
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="div-filtro">
                        <button onClick={() => handleShow1()} className="btn-pdf" type="button" ><FiletypePdf size={25} /> </button>
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
                                            {OrdeByTable("Nome", "nome")}
                                        </ThForm>
                                        <ThForm maxwidth="120px">
                                            {OrdeByTable("1º Turno", "e1_s1")}
                                        </ThForm>
                                        <ThForm maxwidth="130px">
                                            {OrdeByTable("2º Turno", "e2_s2")}
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
                                                <TdForm maxwidth="120px">{horaForm(data.nome.split(' ')[0])}</TdForm>
                                                <TdForm maxwidth="120px">{horaForm(data.e1_s1)}</TdForm>
                                                <TdForm maxwidth="130px">{horaForm(data.e2_s2)}</TdForm>
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
                                        <th>
                                            <span className="span-th-vw">
                                                Nome
                                            </span>
                                        </th>
                                        <td>
                                            <span className="span-td-vw">
                                                {dataVW.nome} {`- (Cód. ${dataVW.id_usuario})`}
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
                        <div className="div-acoes">
                            <Link className="btn-editar" href={`${prefixRouter}/editar/${dataVW.id}`}>Editar </Link>
                        </div>
                    </ModalAcoes>
                </Modal>

                <Modal size="md" show={show1} onHide={handleClose1} animation={false}>
                    <ModalPDF>
                        <Modal.Header className="modal-header" closeButton>
                            <Modal.Title>Gerar PDF</Modal.Title>
                        </Modal.Header>
                        <Formik
                            validationSchema={schemePDF}
                            initialValues={{ mes: pageDefault._dinicial.slice(0, 7), funcionario: "", modelo: 1 }}
                            onSubmit={async (values, setValues) => {
                                if (loadPage) {
                                    setLoadPage(false)
                                    const axios = await api(session);
                                    const params = `?_pdf=true&_mes=${values.mes}&_funcionario=${values.funcionario}`
                                    await axios.get(`/adm/ponto${params} `)
                                        .then((res) => {
                                            if (values.modelo === 1) {
                                                pontosPDF(res.data)
                                            } else {
                                                pontosAssinaturaPDF(res.data)
                                            }
                                            handleClose1()
                                        })
                                        .catch(error => {
                                            const setErro = showError(error)
                                            if (setErro) setValues.setErrors(setErro)
                                        })
                                    setLoadPage(true)
                                }
                            }}
                        >
                            {({ errors, touched, dirty }) => (
                                <FormOne>
                                    <GroupOne
                                        error={!!errors.mes && touched.mes}
                                        label="Mês"
                                        name="mes"
                                        type="month"
                                        md={12}
                                    />
                                    <GroupSelectOne
                                        error={!!errors.funcionario && touched.funcionario}
                                        label="Funcionário"
                                        name="funcionario"
                                        md={12}
                                        data={usuarios}
                                    />
                                    <GroupSelectOne
                                        error={!!errors.modelo && touched.modelo}
                                        label="Modelo"
                                        name="modelo"
                                        md={12}
                                        defaultSelecione={false}
                                        data={[
                                            { value: 1, name: "Padrão" },
                                            { value: 2, name: "Com assinatura" },
                                        ]}
                                    />

                                    <div className="div-btn-salvar">
                                        <button disabled={!loadPage || !dirty} className="btn-salvar" type="submit">GERAR</button>
                                    </div>
                                </FormOne>
                            )}
                        </Formik>
                    </ModalPDF>
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
            const params = `?_page=${pageDefault._page}&_limit=${pageDefault._limit}&_sort=${pageDefault._sort}&_order=${pageDefault._order}&_dinicial=${pageDefault._dinicial}&_dfinal=${pageDefault._dfinal}`
            const { pontos, totalPags, usuarios } = await axios.get(`/adm/ponto${params}&_getusuarios=true`).then(res => res.data)

            return {
                props: { session, data: pontos, totalPags: Math.ceil(totalPags / pageDefault._limit), usuarios: usuarios },
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