const axios = require("axios")
const moment = require("moment")
require("moment/locale/pt-br")
moment.locale('pt-br')

const { parseCookies, setCookie } = require('nookies');

async function api(session = {}) {
    const { tokenApp } = parseCookies()
    let tokenUsuario = ''
    if (session && session.token) tokenUsuario = session.token

    if (!tokenApp) {
        const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
        const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET
        const client_app = process.env.NEXT_PUBLIC_CLIENT_APP

        const urlToken = `${process.env.NEXT_PUBLIC_URL_SERVER}/token?&_client_id=${client_id}&_client_secret=${client_secret}&_client_app=${client_app}`
        const tokenSv = await axios.get(urlToken).then(res => res.data) /* Gera o token  para o passaport do client */

        /* Armazena token por 10m */
        setCookie(null, 'tokenApp', tokenSv, {
            maxAge: 60 * 10 /* expira em 10m, já o token retornado do backend expira em 15m */
        });

        return axios.create({
            baseURL: URL_SERVER,
            headers: {
                "Authorization": `bearer ${tokenSv}`,
                "usuario": tokenUsuario,
            },
        })
    } else {
        return axios.create({
            baseURL: URL_SERVER,
            headers: {
                "Authorization": `bearer ${tokenApp}`,
                "usuario": tokenUsuario,
            },
        })
    }
};

/* Ultiliza no updated_at, created_at, deleted_at */
function dataHoraAtual() {
    const date = new Date();
    /*    date.setHours(date.getHours() - 3) */
    return date;
}

/* Formata em ex:"08/04/2023 13:39:02" */
function horaFormatada(date) {
    if (!date) return ""
    return moment(date).format('L HH:mm:ss')
}

/* Converte as colunas "" em NULL. ex: {nome: ""} => {nome: NULL} */
function FormatObjNull(obj) {
    const objReturn = obj;
    Object.keys(obj).forEach(key => {
        if (!isNaN(obj[key])) objReturn[key] = Number(obj[key]);
        if (obj[key] == "") objReturn[key] = undefined;
        if (obj[key] == "true") objReturn[key] = true;
        if (obj[key] == "false") objReturn[key] = false;
    });
    return objReturn
}

module.exports = { api, FormatObjNull, dataHoraAtual, horaFormatada }