import React from 'react'
import { Link } from 'react-router-dom';
import './Arrow.css'

function Arrow() {
    return (
        <Link to="./.." className="arrow">↩</Link>
    )
}

export default Arrow;