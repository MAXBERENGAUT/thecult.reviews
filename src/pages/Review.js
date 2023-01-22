import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import Arrow from './Arrow'
import styles from './Review.module.css'

const FEATURED_IMAGE_OFFSET = 0.8

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

function Image (image, index, isHover) {
    const offset = index * FEATURED_IMAGE_OFFSET
    return (
        <img
            key={index}
            className={styles.image + ' ' + (isHover ? styles.hide : '')}
            src={image}
            alt={'album cover'}
            style={{ transform: `translate(${-offset}vw, ${offset}vw)` }}
        />
    )
}

const FeaturedImage = (image, index) => Image(image, index, false);
const HoverImage = (image, index) => Image(image, index, true);

function Review() {
    let { category, slug } = useParams()
    const review = require(`/content/${category}/${slug}`)
    const info = Info[category] ? Info[category](review) : null
    let images = [...review.images].reverse()
    const featuredImages = images.map(FeaturedImage)
    const hoverImages = images.map(HoverImage)

    return (
        <main id={styles.review}>
            <Arrow />
            <div id={styles.head}>
                <div>
                    <div id={styles.info}>
                        { info }
                    </div>
                </div>
                <div>
                    <div id={styles.score}>{review.score}</div>
                </div>
                <div 
                    id={styles.stack}
                    style={{
                        marginBottom: `${ review.images.length * FEATURED_IMAGE_OFFSET}vw`,
                        marginLeft: `${ review.images.length * FEATURED_IMAGE_OFFSET}vw`
                    }}
                >
                    {featuredImages}
                    {hoverImages}
                </div>
            </div>
            <div id={styles.body}>{review.body}</div>
        </main>
    )
}

export default Review