import React, { useState, useRef, useEffect } from 'react'
import { loadContent } from '../content.js'
// import Reviews from '../json/reviews.json'
import './Songs.css';

const ITEM_COUNT_MIN = 20
const ITEM_WIDTH = 300
const ITEM_MARGIN = 30
// const ITEM_BORDER = 2
const ITEM_BORDER = 0
const ITEM_LENGTH = ITEM_WIDTH + 2*(ITEM_MARGIN + ITEM_BORDER)
console.log(ITEM_LENGTH)

const MENU_INIT_OFFSET = 0
const MENU_RESISTANCE = 0.05
const MENU_SLOWDOWN = 0.97
const MENU_MIN_VELOCITY = 0.001
const MENU_MAX_VELOCITY = 1
const MENU_DEAD_WIDTH = 0.2
const MENU_UPDATE_TIME = 5

const URL_BASE_IMAGEKIT = 'https://ik.imagekit.io/maxberengautsites/'
// const URL_BASE_LINK = 'https://youtu.be/'
// const URL_BASE_COVER = URL_BASE_IMAGEKIT + 'covers/'
const URL_YT_LOGO = URL_BASE_IMAGEKIT + 'thecult_reviews/yt_logo.svg'
const URL_BACKGROUND = 'https://static.videezy.com/system/resources/previews/000/039/223/original/51_25_08_19.mp4'

const COLORS = [
    '99635C',
    'E68B7E',
    '73DCE6',
    '997B3D',
    'E6BC67',
    'F2BB88',
    'FC8DEB',
    '8CA4E6',
    '8DFCB7',
    'F5EE9D',
]

function Song(entry, index) {
    return (
        <div 
            className='item' 
            key={index} 
            // style={{boxShadow: `inset 0 0 4px 4px #${COLORS[index % COLORS.length]}`}}
            style={{
                boxShadow: `inset 0 0 0 4px #fff, inset 0 0 0 6px #${COLORS[index % COLORS.length]}`,
                fontFamily: "'Raleway', Verdana",
                color: "white",
                wordSpacing: "0.25em",
                lineHeight: "1.5em"
            }}
        >
            <img 
                className='cover tilt' 
                src={entry.cover} 
                alt={entry.album + ' cover'} 
            />
            <div className='content'>
                <p className='song'>{entry.title}</p>
                <p className='artist'>{entry.artist}</p>
                <p className='album'>{entry.album}</p>
                <p className='year'>{entry.year}</p>
            </div>
            <a href={entry.yt_link}>
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
    const [offset, setOffset] = useState(0)
    const [velocity, setVelocity] = useState(0)

    const [items, setItems] = useState(() => {
        let songs = loadContent('songs');

        // pad songs to fill screen
        while (songs.length < ITEM_COUNT_MIN) {
            songs = songs.concat(songs)
        }
        
        return songs.map(Song)
    })
    
    const menu = useRef(null)
    const mouse = useRef({ x: 0, y: 0, isPresent: false})
    const time = useRef(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            // CALCULATE VELOCITY 
            let v_new = 0         
            if (mouse.current.isPresent) {
                const deadZoneLeft = (0.5 - MENU_DEAD_WIDTH) * window.innerWidth
                const deadZoneRight = (0.5 + MENU_DEAD_WIDTH) * window.innerWidth

                let p = 0
                if (mouse.current.x <= deadZoneLeft) {
                    p = (deadZoneLeft - mouse.current.x) / deadZoneLeft
                } else if (mouse.current.x >= deadZoneRight) {
                    p = (deadZoneRight - mouse.current.x) / deadZoneLeft
                }

                const v_target = (MENU_MAX_VELOCITY * p)
                v_new = velocity + (v_target - velocity) * MENU_RESISTANCE

            } else {
                v_new = velocity * MENU_SLOWDOWN
            }

            // skip updating position if no velocity
            const delta = Date.now() - time.current
            time.current = Date.now()

            if (Math.abs(v_new) < MENU_MIN_VELOCITY) return

            
            // update position if velocity is non-zero
            // console.log(delta)
            let o_new = offset + delta * velocity
            
            // FIXME: lag causing loops of alternating item wraps
            // WRAP ITEMS
            // if we have moved far enough left, wrap front item to back
            if (v_new < 0 && -o_new > ITEM_LENGTH + MENU_INIT_OFFSET) {
                setItems((items) => [...items.slice(1), items[0]])
                o_new += ITEM_LENGTH
            }
            
            // if we have moved far enough right, wrap back item to front
            if (v_new > 0 && o_new > -MENU_INIT_OFFSET - ITEM_MARGIN) {
                setItems((items) => [items.at(-1), ...items.slice(0, -1)])
                o_new -= ITEM_LENGTH
            }

            setVelocity(v_new)
            setOffset(o_new)

        }, MENU_UPDATE_TIME)
        
        return () => { 
            // console.log('interval cleared')
            clearInterval(interval)
        }
    }, [velocity, offset])

    function onMouseMove(e) {
        mouse.current.x = e.screenX
        mouse.current.y = e.screenY
    }

    function onMouseEnter() {
        mouse.current.isPresent = true
    }

    function onMouseLeave() {
        mouse.current.isPresent = false
    }

    return (
        <div 
            ref={menu}
            id='menu-songs' 
            style={{transform: `translateX(${offset}px)`}}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items}
        </div>
    )
    
}


function Songs() {
    return (
        <div 
            className="container"
            style={{overflowX: 'hidden', backgroundColor: 'black'}}
        >
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

export default Songs