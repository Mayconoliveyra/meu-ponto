import Head from "next/head";
import styled from "styled-components";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);

import { api } from "../../../global";
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


const Main = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    @media (max-width: 720px){
        padding: 0.5rem;
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
const GroupSC = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    .div-label{
        padding: 0.4rem;
        label{
            font-weight: bold;
            font-size: 1.1em;
        }
    }
    .div-input{
        border-top-color: #949494;
        border: 0.1rem solid #a6a6a6;
        box-shadow: 0 0.1rem 0 rgb(0 0 0 / 7%) inset;
        border-radius: 0.3rem 0.3rem 0 0;
        border-right-color: #949494;
        border-bottom-color: #949494;
        border-left-color: #949494;
        border-color:${({ error }) => error && "#d00"};
        box-shadow:${({ error }) => error && "0 0 0 0.2rem rgb(221 0 0 / 15%) inset;"};
        input{
            width: 100%;
            background-color: transparent;
            padding: 0.8rem;
            padding-top: 0.9rem;
            box-shadow: none;
            border: 0;
            font-size: 1.1rem;
        }
    }
    .div-error{
        font-size: 1rem;
        color: #e72626;
        margin-top: 0.0rem;
        small{
            padding: 0px;
            margin: 0px;
        }
    }
`
export default function AlterarSenha({ session }) {
    const [btnDisabled, setBtnDisabled] = useState(false)

    const scheme = Yup.object().shape({
        senha_old: Yup.string().nullable().label("Senha atual").required("É necessário informar sua senha atual."),
        senha_new: Yup.string().nullable().label("Senha").required("É necessário informar uma nova senha.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
                "Deve ter no mínimo 6 dígitos, 1 letra maiúscula, 1 minúscula e um número"
            ),
        confirsenha: Yup.string().oneOf([Yup.ref("senha_new"), null], "A confirmação de senha não confere.")
            .required("É necessário confirmar sua senha.").label("Confirmar senha")
    });

    return (
        <>
            <Head>
                <title>Alteração de Senha - Softconnect Tecnologia</title>
            </Head>
            <Main>
                <div className="div-alterar">
                    <div className="div-exibir">
                        <div className="div-h1">
                            <h1>Alteração de Senha</h1>
                        </div>
                        <Formik
                            validationSchema={scheme}
                            initialValues={{ senha_old: '', senha_new: '', confirsenha: '' }}
                            onSubmit={async (values, setValues) => {
                                setBtnDisabled(true)
                                const axios = await api(session);
                                await axios.post("/alterar-senha-usuario", values)
                                    .then(() => {
                                        signOut()
                                    })
                                    .catch(error => {
                                        const setErro = showError(error)
                                        if (setErro) setValues.setErrors(setErro)
                                        setBtnDisabled(false)
                                    })
                            }}
                        >
                            {({ errors, touched, dirty }) => (
                                <Form data="form" action="">
                                    <GroupSC error={!!errors.senha_old && touched.senha_old}>
                                        <div className="div-label">
                                            <label htmlFor="senha_old">Senha atual</label>
                                        </div>
                                        <div className="div-input">
                                            <Field name="senha_old" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div className="div-error">
                                            <small>
                                                <ErrorMessage name="senha_old" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.senha_new && touched.senha_new}>
                                        <div className="div-label">
                                            <label htmlFor="senha_new">Nova senha</label>
                                        </div>
                                        <div className="div-input">
                                            <Field name="senha_new" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div className="div-error">
                                            <small>
                                                <ErrorMessage name="senha_new" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.confirsenha && touched.confirsenha}>
                                        <div className="div-label">
                                            <label htmlFor="confirsenha">Confirmar nova senha</label>
                                        </div>
                                        <div className="div-input">
                                            <Field name="confirsenha" type="password" autoComplete='off' maxLength="55" />
                                        </div>
                                        <div className="div-error">
                                            <small>
                                                <ErrorMessage name="confirsenha" />
                                            </small>
                                        </div>
                                    </GroupSC>

                                    <div className="btn-alterar">
                                        <button disabled={!dirty || btnDisabled} type="submit"><b>ALTERAR</b></button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })

    if (session && session.id) {
        return {
            props: { session },
        }
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    }
}