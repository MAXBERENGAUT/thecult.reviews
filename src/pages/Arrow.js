import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Arrow.css'

function Arrow() {
    const navigate = useNavigate();

    return (
        <div className='arrow' onClick={() => navigate(-1)}>↩</div>
    )
}

export default Arrow;