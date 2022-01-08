import React from 'react'
import {Button as MaterialButton} from '@material-ui/core'

export const Button = ({text, icon, clickAction}) => {
    return (
        <MaterialButton
            type="submit"
            onClick={clickAction}
        >
            <span>{icon}</span>
            <span>{text}</span>
        </MaterialButton>
    )
}

Button.defaultProps = {
    type: "submit"
}
