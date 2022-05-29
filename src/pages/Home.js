import React, { useState, useRef, useEffect } from 'react'
import Reviews from './reviews.json'
import './Home.css';

const ITEM_COUNT_MIN = 20
const ITEM_WIDTH = 300
const ITEM_MARGIN = 30
const ITEM_BORDER = 2
const ITEM_LENGTH = ITEM_WIDTH + 2*(ITEM_MARGIN + ITEM_BORDER)

const MENU_INIT_OFFSET = window.innerWidth / 3
const MENU_FRICTION = 0.95
const MENU_MIN_VELOCITY = 0.001
const MENU_MAX_VELOCITY = 1
const MENU_DEAD_WIDTH = 0.2
const MENU_UPDATE_TIME = 10

const URL_BASE_IMAGEKIT = 'https://ik.imagekit.io/maxberengautsites/'
const URL_BASE_LINK = 'https://youtu.be/'
const URL_BASE_COVER = URL_BASE_IMAGEKIT + 'covers/'
const URL_YT_LOGO = URL_BASE_IMAGEKIT + 'thecult_reviews/yt_logo.svg'
const URL_BACKGROUND = 'https://static.videezy.com/system/resources/previews/000/039/223/original/51_25_08_19.mp4'


function Mouse() {
    const [mouse, setMouse] = useState({x: 0, y: 0, isPresent: false})
  
    useEffect(() => {
        function onMouseMove(e) {
            setMouse({x: e.screenX, y: e.screenY, isPresent: true})
        }

        function onMouseLeave(e) {
            setMouse({x: e.screenX, y: e.screenY, isPresent: false})
        }

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseleave', onMouseLeave);
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])
  
    return mouse
}


function Review(review, index) {
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
            <a href={URL_BASE_LINK + review.yt_id}>
                <img 
                    className='yt-logo'
                    src={URL_YT_LOGO}
                    alt='YouTube logo'
                />
            </a>
        </div>
    )
}


function Menu() {
    const [pos, setPos] = useState({
        distance: 0, 
        offset: MENU_INIT_OFFSET,
        velocity: 0
    })

    const [items, setItems] = useState(() => {
        // pad reviews to fill screen
        while (Reviews.length < ITEM_COUNT_MIN) {
            Reviews = Reviews.concat(Reviews)
        }

        return Reviews.map(Review)
    })

    const mouse = Mouse()
    const isMousePresent = useRef(false)
    const menu = useRef(null)
    
    // check mouse positon and update menu accordingly
    let v = 0
    if (isMousePresent.current) {
        const width = window.innerWidth

        let p = 0
        if (mouse.x <= width / 2 - MENU_DEAD_WIDTH * width) {
            p = (width/2 - MENU_DEAD_WIDTH * width - mouse.x) / (width / 2 - MENU_DEAD_WIDTH * width)
        } else if (mouse.x >= width / 2 + MENU_DEAD_WIDTH * width) {
            p = - (mouse.x - (width / 2 + MENU_DEAD_WIDTH * width)) / (width / 2 - MENU_DEAD_WIDTH * width)

        }

        v = pos.velocity + (MENU_MAX_VELOCITY * p - pos.velocity) * (1 - MENU_FRICTION)

    } else {
        v = pos.velocity * MENU_FRICTION
    }
    
    // update position if velocity is non-zero
    if (Math.abs(v) > MENU_MIN_VELOCITY) {
        const d = Math.min(menu.current.scrollLeft + v * MENU_UPDATE_TIME, -pos.distance)

        setTimeout(() => {
            setPos({ 
                distance: pos.distance + d, 
                offset: pos.offset + d,
                velocity: v
            })
            wrapItems()
        }, MENU_UPDATE_TIME)
    }

    function wrapItems() {
        // if we have moved far enough left, wrap front item to back
        if (-pos.offset > ITEM_LENGTH) {
            setItems([...items.slice(1), items[0]])
            setPos({ 
                distance: pos.distance, 
                offset: pos.offset + ITEM_LENGTH,
                velocity: pos.velocity
            })
        }
        
        // if we have moved far enough right, wrap back item to front
        if (pos.offset > 0 && -pos.distance > MENU_INIT_OFFSET) {
            setItems([items.at(-1), ...items.slice(0, -1)])
            setPos({ 
                distance: pos.distance, 
                offset: pos.offset - ITEM_LENGTH,
                velocity: pos.velocity
            })
        }
    }

    function onMouseEnter() {
        isMousePresent.current = true
    }

    function onMouseLeave() {
        isMousePresent.current = false
    }

    return (
        <div 
            ref={menu}
            id='menu' 
            style={{transform: `translateX(${pos.offset}px)`}}

            // onMouseDown={onMouseDown}
            // onMouseUp={onMouseUp}
            // onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}

            // onTouchStart={onMouseDown}
            // onTouchMove={onMouseMove}
            // onTouchCancel={onMouseUp}
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
                src={URL_BACKGROUND} 
                type='video/mp4' 
            />
            <Menu />
        </div>
    )
}

export default Home