import styled from "styled-components"

const CabecalhoForm = styled.section`
    display: flex;
    padding: 20px 15px;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px 1px 15px 1px rgb(69 65 78 / 8%);
    padding: 14px;

    .btn-adicionar{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        color: #ffffff;
        border-radius: 2px;
        padding: 0.6rem 1.2rem;
        box-shadow: inset 0px -1px 0px 0px rgb(0 0 0 / 9%);

        background-color: #198754;
        border-color: #198754;
        span{
            margin-left: 4px;
        }

        &:disabled{
            cursor: default;
        }
        &:hover{
            background-color: #157347;
            border-color: #146c43;
        }

        @media (max-width: 720px){
            span{
                display: none;
            }
        }
    }
    .div-input-pesquisa{
        flex: 1;
        display: flex;
        justify-content: flex-end;
        input{
            width: 20rem;
            padding: 0.5rem 0.9rem;
            font-size: 0.8rem;
            color: #555555;
            border-radius: 0;
            border: 1px solid #cccccc;
            background-color: #ffffff;
            box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
            transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        }
        button{
            font-size: 0.8rem;
            color: #ffffff;
            padding: 0 1rem;
            background-color: #212529;
            border-color: #212529;
            &:hover{
                background-color: #424649;
                border-color: #373b3e;
            }
        }
        @media (max-width: 720px){
            margin-left: 1rem;
            input{
                width: 100%;
                padding: 0.6rem 0.9rem;
                font-size: 1rem;
            }
        }
    }
`;

export { CabecalhoForm }