import { useParams } from 'react-router-dom'
import Arrow from './Arrow'
import './Review.css';

function Information(category, review) {
    switch (category) {
        case 'music':
            return [
                <div>{review.title}</div>,
                <div>{review.artist}</div>,
                <div>{review.album}</div>,
                <div>{review.year}</div>,
            ]

        case 'movies':
            return [
                <div>{review.title}</div>,
                <div>{review.company}</div>,
                <div>{review.year}</div>,
                <div>Director: {review.director}</div>,
                <div>Screenwriter: {review.screenwriter}</div>,
                <div>Novelist: {review.novelist}</div>,
                <div>{review.actors}</div>,
            ]

        case 'art':
            return [
                <div>{review.title}</div>,
                <div>{review.artist}</div>,
                <div>{review.year}</div>,
                <div>{review.museum}</div>,
                <div>{review.creator}</div>,
            ]

        case 'literature':
            return [
                <div>{review.title}</div>,
                <div>{review.writer}</div>,
                <div>{review.year}</div>,
            ]

        case 'tv':
            return [
                <div>{review.title}</div>,
                <div>{review.network}</div>,
                <div>{review.creator}</div>,
                <div>{review.actors}</div>,
                <div>{review.year}</div>,
            ]

        default: return []
    }
}

function Review() {
    let params = useParams()
    const review = require(`/content/${params.category}/${params.slug}`)
    let imgOffset = 1.5;

    return (
        <div id='review-wrap'>
            <Arrow />
            <div id='review-head'>
                <div>
                    <div id='review-info'>
                        {Information(params.category, review)}
                    </div>
                </div>
                <div>
                    <div id='review-score'>{review.score}</div>
                </div>
                <div className="stack"
                    style={{
                        marginBottom: `${ review.images.length * imgOffset}vw`,
                        marginLeft: `${ review.images.length * imgOffset}vw`
                    }}
                >
                    {review.images.map((image, index) => (
                        <img
                            key={index}
                            className={`review-poster`}
                            src={image}
                            alt={review.title + ' featured image'}
                            style={{ 
                                transform: `translate(${index * -imgOffset}vw, ${index * imgOffset}vw)` 
                            }}
                        />
                    ))}
                </div>
            </div>
            <div id='review-body'>{review.body}</div>
        </div>
    )
}

export default Review