import React, { useState } from 'react'

const REVIEWS = [
    {title: 'this is a test show title', score: 1.2},
    {title: 'smaller title', score: 3.4},
    {title: 'title', score: 5.6},
    {title: 'another title here', score: 7.8},
    {title: 'one final title', score: 9.0},
]

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
            >
                {review.score}
            </div>
            <div className={'line' + fade} />
        </div>
    )
} 

function Explorer() {
    let items = REVIEWS.map(Review)

    return (
        <div>
            <div id='breadcrumb'>Television</div>
            <div id='review-list'>
                {items}
            </div>
        </div>
    )
}

export default Explorer