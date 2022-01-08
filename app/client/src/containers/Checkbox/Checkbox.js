import { useState } from 'react'

export const Checkbox = ({ id, options, setOptions }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (e) => {
        setIsChecked(!isChecked);
        if (e.target.checked) {
            setOptions([...options, id])
        } else {
            setOptions(
                options.filter((auth) => auth !== id)
            )
        }
    }

    return (
        <input 
            type='checkbox'
            onChange={handleChange} 
            checked={isChecked} 
            value={options} />
    );
}
