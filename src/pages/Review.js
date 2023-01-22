import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Arrow from './Arrow'
import './Review.css';

const FEATURED_IMAGE_OFFSET = 1.5

const Info = {
    music: (review) => (
        <Fragment>
            <div>{review.title}</div>
            <div>{review.artist}</div>
            { review.title === review.album ? null : <div>{review.album}</div> }
            <div>{review.year}</div>
        </Fragment>
    ),
    movies: (review) => (
        <Fragment>
            <div>{review.title}</div>
            <div>{review.company}</div>
            <div>{review.year}</div>
            <div>Director: {review.director}</div>
            <div>Screenwriter: {review.screenwriter}</div>
            <div>Novelist: {review.novelist}</div>
            <div>{review.actors}</div>
        </Fragment>
    ),
    art: (review) => (
        <Fragment>
            <div>{review.title}</div>
            <div>{review.artist}</div>
            <div>{review.year}</div>
            <div>{review.museum}</div>
            <div>{review.creator}</div>
        </Fragment>
    ),
    literature: (review) => (
        <Fragment>
            <div>{review.title}</div>
            <div>{review.writer}</div>
            <div>{review.year}</div>
        </Fragment>
    ),
    tv: (review) => (
        <Fragment>
            <div>{review.title}</div>
            <div>{review.network}</div>
            <div>{review.creator}</div>
            <div>{review.actors}</div>
            <div>{review.year}</div>
        </Fragment>
    )
}

function FeaturedImage (image, index) {
    let offset = index * FEATURED_IMAGE_OFFSET

    return (
        <img
            key={index}
            className={`review-poster`}
            src={image}
            alt={'album cover'}
            style={{ transform: `translate(${-offset}vw, ${offset}vw)` }}
        />
    )
}

function Review() {
    let { category, slug } = useParams()
    const review = require(`/content/${category}/${slug}`)
    const info = Info[category] ? Info[category](review) : null

    return (
        <div id='review-wrap'>
            <Arrow />
            <div id='review-head'>
                <div>
                    <div id='review-info'>
                        { info }
                    </div>
                </div>
                <div>
                    <div id='review-score'>{review.score}</div>
                </div>
                <div className="stack"
                    style={{
                        marginBottom: `${ review.images.length * FEATURED_IMAGE_OFFSET}vw`,
                        marginLeft: `${ review.images.length * FEATURED_IMAGE_OFFSET}vw`
                    }}
                >
                    {review.images.reverse().map(FeaturedImage)}
                </div>
            </div>
            <div id='review-body'>{review.body}</div>
        </div>
    )
}

export default Review