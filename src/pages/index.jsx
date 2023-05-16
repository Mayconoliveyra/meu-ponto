import Head from "next/head";
import Image from "next/image";
import router from "next/router"
import styled from "styled-components";
import { signIn } from "next-auth/react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { DoorOpen } from "react-bootstrap-icons"
import { toast } from "react-toastify";
import { useState } from "react";
import * as Yup from "yup";
import { pt } from "yup-locale-pt";
Yup.setLocale(pt);
import { getSession } from "next-auth/react";

import { api } from "../../global"
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

const Main = styled.main`
    height: 100vh;
    background-color: #FFFFFF;
    display: flex;

    .s-login{
        flex: 1;
        width: 100%;
        padding: 1rem;
        @media (min-width:1000px){
            max-width: 700px;
        }

        .d-exibir{
            margin: auto;
            max-width: 30rem;
            .f-form{
                display: flex;
                flex-direction: column;

                .div-logo{
                    background-color: #232F3E;
                        padding: 1.2rem 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    
                }
                @media (min-width:1000px){
                    .div-logo{
                        display: none;
                    }
                }
               
                h1{
                    text-align:center;
                    padding-top: 2rem;
                    margin-bottom: 4rem;
                    font-weight: bold;
                    color: #111;
                }
                .d-recuperar{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 1rem !important;
                    font-weight: bold;
                    margin: 1rem 0;
                    margin-top: 0.5rem;
                    label{
                        display: flex;
                        align-items:center;
                    input{
                        height: 1.7rem;
                        width: 1.7rem;
                    }
                    span{
                        margin-left: 7px;
                    }
                    }
                    a{
                        font-size: 1rem !important;
                        text-decoration: underline;
                    }
                }
                .btn-entrar{
                    margin: 0.5rem 0px;
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
                        svg{
                            margin-right: 0.6rem;
                            font-size: 1.7rem;
                        }
                    }
                }
            }
        }
    }
    .s-logo{
        background-color: #232F3E;
        @media (max-width:1000px){
            display: none;
        }
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const GroupSC = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  .d-label{
    padding: 0.4rem;
    label{
        font-weight: bold;
        font-size: 1.4em;
    }
  }
  .d-input{
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
    .d-show-password{
      width: 100%;
      padding: 0 10px 6px 10px;
      span{
        color: #555!important;
        font-size: 0.9rem !important;
      }
    }
  }
  .d-error{
        font-size: 1rem;
        color: #e72626;
        margin-top: 0.0rem;
        small{
            padding: 0px;
            margin: 0px;
        }
  }
`

export default function Home() {
    const [btnDisabled, setBtnDisabled] = useState(false)
    const initialValues = {
        email: '',
        senha: '',
        show_password: true,
    }
    const scheme = Yup.object().shape({
        email: Yup.string().email().label("E-mail").required(),
        senha: Yup.string().required().label("Senha"),
    });
    return (
        <>
            <Head>
                <title>Softconnect Tecnologia</title>
            </Head>
            <Main>
                <section className="s-login">
                    <div className="d-exibir">
                        <Formik
                            validationSchema={scheme}
                            initialValues={initialValues}
                            onSubmit={async (values, setValues) => {
                                setBtnDisabled(true)
                                const axios = await api();
                                await axios.post("/entrada-usuario", values)
                                    .then(async (res) => {
                                        const user = await signIn("credentials", {
                                            redirect: false,
                                            usuario: JSON.stringify(res.data)
                                        });

                                        if (!user.error) {
                                            router.push("/dashboard")
                                        } else {
                                            router.reload()
                                        }
                                    })
                                    .catch(error => {
                                        const setErro = showError(error)
                                        if (setErro) setValues.setErrors(setErro)
                                        setBtnDisabled(false)
                                    })
                            }}
                        >
                            {({ setFieldValue, values, errors, touched, dirty }) => (
                                <Form className="f-form" action="">
                                    <div className="div-logo">
                                        <Image src={'/assets/images/logo.png'} width={200} height={50} alt="logo" quality={100} priority={true} />
                                    </div>
                                    <h1>FAZER LOGIN</h1>
                                    <GroupSC error={!!errors.email && touched.email}>
                                        <div className="d-label">
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <div className="d-input">
                                            <Field name="email" autoComplete="on" type="email" maxLength="120" />
                                        </div>
                                        <div className="d-error">
                                            <small>
                                                <ErrorMessage name="email" />
                                            </small>
                                        </div>
                                    </GroupSC>
                                    <GroupSC error={!!errors.senha && touched.senha}>
                                        <div className="d-label">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="d-input">
                                            <Field name="senha" autoComplete="on" type="password" maxLength="255" />
                                            {values.show_password && values.senha && (
                                                <div className="d-show-password">
                                                    <span name="senha" value>{values.senha}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="d-error">
                                            <small>
                                                <ErrorMessage name="senha" />
                                            </small>
                                        </div>
                                    </GroupSC>

                                    <div className="d-recuperar">
                                        <label htmlFor="show_password" onClick={() => setFieldValue("show_password", !values.show_password)}>
                                            <Field name="show_password" type="checkbox" /><span>Mostrar senha</span>
                                        </label>
                                    </div>

                                    <div className="btn-entrar">
                                        <button disabled={btnDisabled} type="submit"><DoorOpen /><b>ENTRAR</b></button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </section>
                <section className="s-logo">
                    <Image src={'/assets/images/logo.png'} width={300} height={60} alt="logo" quality={100} priority={true} />
                </section>
            </Main>
        </>
    );
}

export async function getServerSideProps(context) {
    const { req } = context
    const session = await getSession({ req })
    if (session && session.id) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}