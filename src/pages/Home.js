import { Component, createRef } from 'react'
import Reviews from './reviews.json'
import Background from './media/timelapse.mp4'
import YTLogo from './media/yt_logo.svg'
import './Home.css';

const ITEM_WIDTH = 300
const ITEM_MARGIN = 30
const ITEM_BORDER = 2
const ITEM_LENGTH = ITEM_WIDTH + 2*(ITEM_MARGIN + ITEM_BORDER)

const COVER_BASE_URL = 'https://ik.imagekit.io/maxberengautsites/covers/'
const LINK_BASE_URL = 'https://youtu.be/'

class Menu extends Component {    
    constructor(props) {
        super(props)

        this.state = { 
            offset: 0,
            distance: 0
        }

        this.ref = createRef()
    }

    onMouseMove = e => {
        if (!this.isDown) return;

        e.preventDefault();
        let x2 = e.pageX - this.ref.current.offsetLeft
        let d = this.ref.current.scrollLeft - (this.x1 - x2);

        if (this.state.distance + d > 0) {
            d = -this.state.distance;
        }

        this.setState({ 
            offset: this.state.offset + d,
            distance: this.state.distance + d
        });
            
        this.x1 = e.pageX - this.ref.current.offsetLeft
        this.wrapItems()
    }

    onMouseDown = e => { 
        e.persist()
        this.isDown = true
    
        this.x1 = e.pageX - this.ref.current.offsetLeft
        this.ref.current.style.cursor = "grabbing"
    }

    onMouseUp = e => { 
        this.isDown = false
        this.ref.current.style.cursor = "unset"
    }

    reposition = () => {
        return {
            transform: `translateX(${this.state.offset}px)`
        }
    }

    items = Reviews.map( (review, index) => {
        return (
            <div className='item highlight' key={index}>
                <img 
                    className='cover tilt' 
                    src={COVER_BASE_URL + review.cover} 
                    alt={review.album + ' cover'}
                />
                <p className='song'>{review.song}</p>
                <p className='artist'>{review.artist}</p>
                <p className='album'>{review.album}</p>
                <p className='year'>{review.year}</p>
                <a href={LINK_BASE_URL + review.link}>
                    <img 
                        className='yt-logo'
                        src={YTLogo}
                        alt='YouTube logo'
                    />
                </a>
            </div>
        )
    })

    wrapItems = () => {
        // if we have moved far enough left, wrap front item to back
        if (-this.state.offset > ITEM_LENGTH) {
            this.items.push(this.items[0])
            this.items.shift()
            
            this.setState({ 
                offset: this.state.offset + ITEM_LENGTH,
                distance: this.state.distance
            })
        }
        
        // if we have moved far enough right, wrap back item to front
        if (this.state.offset > 0) {
            this.items.unshift(this.items[this.items.length-1])
            this.items.pop()

            this.setState({
                offset: this.state.offset - ITEM_LENGTH,
                distance: this.state.distance
            })
        }
    }
    
    padItems = () => {
        console.log('padded!')
        // while the screen is wider than the menu, double the items
        while (this.ref.current.clientWidth + this.state.offset - ITEM_LENGTH < window.innerWidth) {
            this.items = this.items.concat(this.items)
        }
    }

    useEffect = () => {
        window.addEventListener('resize', this.padItems)
        this.padItems()
    }

    render() {
        return (
            <div 
                ref={this.ref}
                id='menu' 
                style={this.reposition()}
                onMouseDown={this.onMouseDown}
                onMouseUp={this.onMouseUp}
                onMouseMove={this.onMouseMove}
            >
                {this.items}
            </div>
        )
    }
}

const Home = () => {
    return (
        <div className="container">
            <video autoPlay muted loop id='background' src={Background} type='video/mp4' />
            <Menu />
        </div>
    )
}

export default Home