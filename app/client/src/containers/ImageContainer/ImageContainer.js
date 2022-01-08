import React from 'react'
import './ImageContainer.css'

export const ImageContainer = ({src}) => {
    return (
        <div className="imageContainer">
            <img src={src} alt=""/>
        </div>
    )
}
