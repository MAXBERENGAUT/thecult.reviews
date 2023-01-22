import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Arrow.module.css'

function Arrow() {
    return (
        <Link to="./.." id={styles.arrow} reloadDocument>↩</Link>
    )
}

export default Arrow;