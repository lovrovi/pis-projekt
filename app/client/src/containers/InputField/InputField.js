import React from 'react'
import './InputField.css'
import InputLabel from '@material-ui/core/InputLabel';
import { Field, ErrorMessage } from 'formik'

export const InputField = ({ name, label, type, as, options }) => {
    return (
        <div className="detailsField">
            <div>
                <InputLabel>{label}: </InputLabel>
                <Field
                    type={type}
                    name={name}
                    as={as}
                >
                    {options}
                </Field>
            </div>
            <ErrorMessage
                type={type}
                name={name}
                as={as}
            />
        </div>
    )
}

InputField.defaultProps = {
    type: "text"
}
