import MaskedInput from "react-text-mask";
import { Form, Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FormOneSC = styled.section`
    padding: 20px 15px;
    @media (max-width: 720px){
        padding: 0px;
    }
    form{
        background: #ffffff;
        border: #CCCCCC solid 1px;
        margin-bottom: 20px;
        border-radius: 3px;
        width: 100%;

        padding: 15px 10px;

        @media (max-width: 720px){
            border: none;
            border-top: #CCCCCC solid 1px;
            border-radius: 0px;
        }
    }
    #row{
        margin-right: 0px;
        margin-left: 0px;
    }
    #Col{
        padding: 0px 3px; 
    }
    .alert {
        font-size: 0.8rem !important;
    }

    .h4-titulo{
        display: flex;
        align-items: flex-end;
        margin: 10px 0px;
        h4{
            font-weight: bold;
            font-size: 15px;
            margin-left: 6px;
        }
    }
    .div-btn-salvar{
        display: flex;
        align-items: center;
        margin: 25px auto;
        max-width: 500px;
        button,a{
            padding: 8px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
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
        .btn-salvar{
            background-color: #198754;
            border-color: #198754;
            &:hover{
                background-color: #157347;
                border-color: #146c43;
            }
        }
    }
`;
const GroupOneSC = styled.div`
    padding: 0px 5px;
    label {
        color: #333333 !important;
        font-size: 12px !important;
        font-weight: bold;
        white-space: nowrap;
    }
    label:after {
        color: #F00;
        content: '*';
        display: ${({ required }) => required ? 'inline' : 'none'};
    }
    
    
    input, select {
        /* PARAMENTRO 'error' */
        border-color:${({ error }) => error && "#d00 !important;"};
        box-shadow:${({ error }) => error && "0 0 0 0.2rem rgb(221 0 0 / 15%) inset !important;"};

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
    textarea {
        border-color:${({ error }) => error && "#d00 !important;"};
        box-shadow:${({ error }) => error && "0 0 0 0.2rem rgb(221 0 0 / 15%) inset !important;"};

        margin-top: 2px;
        display: block;
        width: 100%;
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

    small {
        margin-left: 3px;
        color: #fe316c;
    }
`;

const FormOne = ({ children }) => {
    return (
        <FormOneSC>
            <Form>
                <Row id="row">{children}</Row>
            </Form>
        </FormOneSC>
    );
};
const GroupOne = ({ name, label, type = "text", required = false, autocomplete = "off", maxlength = 255, mask = false, error = false, placeholder, disabled = false, xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required} error={error} >
                <label htmlFor={name}>{label}</label>
                {
                    !mask && (
                        <Field name={name}>
                            {({ field }) => (
                                <input
                                    {...field}
                                    id={name}
                                    type={type}
                                    maxLength={maxlength}
                                    autoComplete={autocomplete}
                                    placeholder={placeholder}
                                    disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                                    required={required}
                                    value={field.value != undefined ? field.value : ""}
                                />
                            )}
                        </Field>
                    )
                }
                {
                    !!mask && (
                        <Field name={name}>
                            {({ field }) => (
                                <MaskedInput
                                    {...field}
                                    id={name}
                                    type={type}
                                    maxLength={maxlength}
                                    autoComplete={autocomplete}
                                    mask={mask}
                                    guide={false}
                                    showMask={false}
                                    placeholder={placeholder}
                                    disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                                    required={required}
                                    value={field.value != undefined ? field.value : ""}
                                />
                            )}
                        </Field>
                    )
                }
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col >
    );
};

const GroupTextarea = ({ name, label, required = false, autocomplete = "off", maxlength = 255, error = false, placeholder, disabled = false, xs, sm, md, lg, xl, xxl, rowstxt = 5, colstxt = 15 }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required} error={error} >
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <textarea
                            {...field}
                            id={name}
                            maxLength={maxlength}
                            autoComplete={autocomplete}
                            placeholder={placeholder}
                            disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                            required={required}
                            value={field.value != undefined ? field.value : ""}
                            rows={rowstxt}
                            cols={colstxt}
                        />
                    )}
                </Field>
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col >
    );
};
const GroupMoney = ({ fixed = 2, setFieldValue, name, label, type = "number", required = false, autocomplete = "off", maxlength = 7, error = false, placeholder = "R$ 0,00", disabled = false, xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required} error={error} >
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <input
                            {...field}
                            id={name}
                            type={type}
                            maxLength={maxlength}
                            autoComplete={autocomplete}
                            placeholder={placeholder}
                            disabled={disabled == true || disabled == "true" || disabled == "1" || disabled == 1 ? true : false}
                            required={required}
                            value={field.value != undefined ? field.value : ""}
                            onBlur={(() =>
                                setFieldValue(name, Number(field.value).toFixed(fixed))
                            )}
                        />
                    )}
                </Field>
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col >
    );
};
const GroupSelectOne = ({ defaultSelecione = true, name, label, required = false, data = [], xs, sm, md, lg, xl, xxl }) => {
    const propsGroup = {
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
    };
    return (
        < Col id="Col"  {...propsGroup} >
            <GroupOneSC required={required}>
                <label htmlFor={name}>{label}</label>
                <Field name={name}>
                    {({ field }) => (
                        <select
                            {...field}
                            id={name}
                            name={name}
                            required={required}
                            value={field.value != undefined ? field.value : ""}
                        >
                            {defaultSelecione && (
                                <option>Selecione</option>
                            )}
                            {data.map((item, key) => {
                                return <option key={key} value={item.value}>{item.name}</option>
                            })}
                        </select>
                    )}
                </Field>
                <small>
                    <ErrorMessage name={name} />
                </small>
            </GroupOneSC>
        </Col>
    );
};

export { FormOne, GroupOne, GroupTextarea, GroupMoney, GroupSelectOne }