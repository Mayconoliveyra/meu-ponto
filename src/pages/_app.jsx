import { ThemeProvider } from "styled-components"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import TemplateContext from "../context/template"

import Content from "../components/template/content";

import { GlobalStyles } from "../styles/global-styles"
import Menu from "../components/template/menu";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter()
  const defaultTemplate = { loading: false, showMenu: false }
  const [template, setTemplate] = useState(defaultTemplate)

  /* Se showMenu ou showMenuLogin for verdadeiro, remove scroll do tbody */
  useEffect(() => {
    const tbody = document.getElementById("idBody");
    tbody.style.overflow = template.showMenu ? "hidden" : 'auto'
  }, [template])

  return (
    <ThemeProvider theme={{}}>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GlobalStyles />
      <SessionProvider session={pageProps.session}>
        <TemplateContext.Provider value={{ template, setTemplate }}>
          {pathname != "/" ?
            <>
              {template.showMenu && < Menu session={pageProps.session} />}
              <Content>
                <Component {...pageProps} />
              </Content>
            </>
            :
            <Component {...pageProps} />
          }
        </TemplateContext.Provider>
      </SessionProvider>
    </ThemeProvider>
  )
}
