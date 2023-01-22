import React, { useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { loadContent } from '../content';
import Arrow from './Arrow';
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
            <div className={'dot' + fade}>
                <div className="upper">
                    {review.artist || review.director}
                </div>
                <div className="lower">
                    {review.title}
                </div>
            </div>
            <img 
                className={'title'}
                src={review.image}
                alt={review.title}
                onMouseEnter={onMouseEnter}
                onMouseOver={onMouseEnter}
                onTouchStart={() => (
                    setFade(fade === ' fade-in' ? ' fade-out' : ' fade-in')
                )}
 
            />
            <Link 
                className={'score' + fade}
                to={review.slug}
                reloadDocument
            >
                {review.score}
            </Link>
            <div className={'line' + fade} />
        </div>
    )
} 

function choose(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function Breadcrumb(category) {
    let style = useRef({});
    if (!('top' in style.current)){
        style.current['top'] = `${Math.random() * 90}vh`
        style.current['textAlign'] = choose(['left', 'right', 'center'])
        style.current[choose(['left', 'right'])] = '0';
    }

    return (
        <div 
            id='breadcrumb' 
            style={style.current}
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
            <Arrow />
            {Breadcrumb(category)}
            <div id='review-list'>
                {items}
            </div>
        </div>
    )
}

export default Explorer