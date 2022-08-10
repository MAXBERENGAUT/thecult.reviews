import { useParams } from 'react-router-dom'
import './Review.css';

function Review() {
    let params = useParams()
    let review = require(`/content/${params.category}/${params.slug}`)

    return (
        <div id='review-wrap'>
            <div id='review-head'>
                <div>
                    <div id='review-info'>
                        <div>{review.title}</div>
                        <div>Artist: {review.artist}</div>
                        <div>Year: {review.year}</div>
                        <div>Authors: {review.authors} </div>
                    </div>
                </div>
                <div>
                    <div id='review-score'>{review.score}</div>
                </div>
                <div>
                    <img 
                        id='review-poster'
                        className='tilt'
                        src={review.cover}
                        alt={review.title + ' cover'} //TODO: add proper alt
                    />                
                </div>
            </div>
            <div id='review-body'>{review.body}</div>
        </div>
    )
}

export default Review