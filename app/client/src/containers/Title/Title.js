import React from 'react'
import './Title.css'
import Typography from '@material-ui/core/Typography';

export const Title = ({ label }) => {
    return (
        <div className="label">
            <Typography variant="h4" gutterBottom>
                {label}
            </Typography>
        </div>
    )
}
