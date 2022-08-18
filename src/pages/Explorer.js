import React, { useState, useRef } from 'react'
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

function choose(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function Breadcrumb(category) {
    let style = useRef({});
    // let style = {
    //     position: 'fixed',
    //     fontFamily: 'Georgia',
    //     fontSize: '275%',
    //     color: 'black',
    //     wordSpacing: '0.25em'
    // }

    console.log(style.current)
    if (!('top' in style.current)){
        style.current['top'] = `${Math.random() * 90}vh`
        style.current['textAlign'] = choose(['left', 'right', 'center'])
        style.current[choose(['left', 'right'])] = '0';
    }

    return (
        <div 
            id='breadcrumb' 
            style={style.current}
            // className={choose(['bc-left', 'bc-right'])}
        >
            {BREADCRUMBS[category]}
        </div>
    )
}

function Explorer() {
    let category = useParams().category
    let reviews = loadContent(category);
    let items = reviews.map(Review)

    return (
        <div>
            {Breadcrumb(category)}
            {/* TODO: randomly reposition breadcrumb until not colliding with review
                - random chance of left, center, or right text align
                - random chance of left: 0 or right: 0
                - random top
                - width: 
            
            */}
            <div id='review-list'>
                {items}
            </div>
        </div>
    )
}

export default Explorer