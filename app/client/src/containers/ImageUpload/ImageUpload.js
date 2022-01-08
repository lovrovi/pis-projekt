import React from 'react'

export const ImageUpload = ({setImage, name}) => {
    return (
        <div className="imageUpload">
            <input
                name={name}
                onChange={(e) => {
                    setImage(name, e.target.files[0])
                }}
                label="Upload image"
                type="file"
            />
        </div>
    )
}
