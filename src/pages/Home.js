import React, { useState, useRef } from 'react'
import Reviews from './reviews.json'
import './Home.css';

const ITEM_COUNT_MIN = 20
const ITEM_WIDTH = 300
const ITEM_MARGIN = 30
const ITEM_BORDER = 2
const ITEM_LENGTH = ITEM_WIDTH + 2*(ITEM_MARGIN + ITEM_BORDER)

const URL_BASE_IMAGEKIT = 'https://ik.imagekit.io/maxberengautsites/'
const URL_BASE_LINK = 'https://youtu.be/'
const URL_BASE_COVER = URL_BASE_IMAGEKIT + 'covers/'
const URL_BACKGROUND = URL_BASE_IMAGEKIT + 'thecult_reviews/timelapse.mp4'
const URL_YT_LOGO = URL_BASE_IMAGEKIT + 'thecult_reviews/yt_logo.svg'


function Menu() {    
    const [pos, setPos] = useState({distance: 0, offset: 0})
    const [items, setItems] = useState(() => {
        // pad reviews to fill screen
        while (Reviews.length < ITEM_COUNT_MIN) {
            Reviews = Reviews.concat(Reviews)
        }

        return Reviews.map((review, index) => {
            return (
                <div className='item' key={index}>
                    <img 
                        className='cover tilt' 
                        src={URL_BASE_COVER + review.cover} 
                        alt={review.album + ' cover'}
                    />
                    <p className='song'>{review.song}</p>
                    <p className='artist'>{review.artist}</p>
                    <p className='album'>{review.album}</p>
                    <p className='year'>{review.year}</p>
                    <a href={URL_BASE_LINK + review.link}>
                        <img 
                            className='yt-logo'
                            src={URL_YT_LOGO}
                            alt='YouTube logo'
                        />
                    </a>
                </div>
            )}
        )}
    )

    const menu = useRef(null)
    const x1 = useRef(null)
    const isDown = useRef(false)

    function onMouseMove(e) {
        if (!isDown.current) return;

        e.preventDefault()
        let x2 = e.pageX - menu.current.offsetLeft
        let d = Math.min(menu.current.scrollLeft - (x1.current - x2), -pos.distance)
        x1.current = e.pageX - menu.current.offsetLeft

        setPos({ distance: pos.distance + d, offset: pos.offset + d })

        // if we have moved far enough left, wrap front item to back
        if (-pos.offset > ITEM_LENGTH) {
            setItems([...items.slice(1), items[0]])
            setPos({ distance: pos.distance, offset: pos.offset + ITEM_LENGTH })
        }
        
        // if we have moved far enough right, wrap back item to front
        if (pos.offset > 0) {
            setItems([items.at(-1), ...items.slice(0, -1)])
            setPos({ distance: pos.distance, offset: pos.offset - ITEM_LENGTH })
        }
    }

    function onMouseDown(e) { 
        e.persist()
        isDown.current = true
        x1.current = e.pageX - menu.current.offsetLeft
        menu.current.style.cursor = "grabbing"
    }

    function onMouseUp() { 
        isDown.current = false
        menu.current.style.cursor = "unset"
    }

    function onMouseLeave() {
        isDown.current = false
        menu.current.style.cursor = "unset"
    }

    return (
        <div 
            ref={menu}
            id='menu' 
            style={{transform: `translateX(${pos.offset}px)`}}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            {items}
        </div>
    )
    
}


function Home() {
    return (
        <div className="container">
            <video 
                autoPlay 
                muted 
                loop 
                id='background' 
                src={URL_BACKGROUND} 
                type='video/mp4' 
            />
            <Menu />
        </div>
    )
}

export default Home