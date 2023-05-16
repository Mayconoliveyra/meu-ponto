import moment from "moment"
import 'moment/locale/pt-br'
moment.locale('pt-br')

const moneyMask = (vlr, showRS = true) => {
    /*   if (!Number(vlr)) return 'R$ 0,00' */
    const valor = Number(vlr)
        .toFixed(2)
        .replace(".", ",")
        /* se retirar esse comentario da erro no js */
        //eslint-disable-next-line 
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    if (showRS) return `R$ ${valor}`; /* Exibir com  o simbolo R$ */
    return `${valor}`; /* Exibir sem simbolo R$ */
}

const telefoneMask = ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

const nascimentoMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

const cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
const rgMask = [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/];

export {
    moneyMask,
    telefoneMask,
    cepMask,
    nascimentoMask,
    cpfMask,
    rgMask
}