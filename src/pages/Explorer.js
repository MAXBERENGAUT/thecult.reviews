import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadContent } from '../content.js'
import './Explorer.css';

const BREADCRUMBS = {
    'music': 'Music',
    'movies': 'Movies',
    'art': 'Art (Museums)',
    'songs': 'Songs of the Month',
    'literature': 'Literature',
    'tv': 'Television'
}

function Review(review, index) {
    let [fade, setFade] = useState('')

    function onMouseEnter() {
        setFade(' fade-in')
    }

    function onMouseLeave() {
        setFade(' fade-out')
    }


    return (
        <div 
            className="review"
            key={index}
            onMouseLeave={onMouseLeave}
        >
            <div className={'dot' + fade} />
            <div 
                className="title"
                onMouseEnter={onMouseEnter}
                onMouseOver={onMouseEnter}    
            >
                {review.title}
            </div>
            <div 
                className={'score' + fade}
                onClick={() => {window.location.href += `/${review.slug}`}}
            >
                {review.score}
            </div>
            <div className={'line' + fade} />
        </div>
    )
} 

function Explorer() {
    let category = useParams().category
    let reviews = loadContent(category);
    let items = reviews.map(Review)

    return (
        <div>
            <div id='breadcrumb'>{BREADCRUMBS[category]}</div>
            <div id='review-list'>
                {items}
            </div>
        </div>
    )
}

export default Explorer