import './Review.css';

const URL_BASE_IMAGEKIT = 'https://ik.imagekit.io/maxberengautsites/'
const URL_BASE_COVER = URL_BASE_IMAGEKIT + 'covers/'

function Review() {
    return (
        <div id='review-wrap'>
            <div id='review-head'>
                <div>
                    <div id='review-info'>
                        <div>Artist: Director / Writer</div>
                        <div>Year: 2022</div>
                        <div>Authors: Max Berengaut, Joshua Devine</div>
                    </div>
                </div>
                <div>
                    <div id='review-score'>
                        9.4
                    </div>
                </div>
                <div>
                    <img 
                        id='review-poster'
                        className='tilt'
                        src={URL_BASE_COVER + "goldenhaze.jpeg"}
                        alt='Poster'
                    />                
                </div>
            </div>
            <div id='review-body'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras 
                eget vulputate ante. Mauris sed suscipit purus, id vestibulum 
                massa. Proin at pharetra metus, porta dictum metus. Orci varius 
                natoque penatibus et magnis dis parturient montes, nascetur 
                ridiculus mus. Vivamus sed magna condimentum, sagittis diam 
                accumsan, ullamcorper nisl. Suspendisse mattis pretium felis a 
                rhoncus. Nam aliquam mollis ante, tempus vulputate nibh. Nam 
                sagittis at nisl vitae congue. In consequat nibh at massa 
                volutpat ullamcorper. <br />

                Nam iaculis libero felis, sed malesuada lorem tincidunt et. 
                Donec non viverra quam. Donec quis nunc nec metus placerat 
                sollicitudin vel quis mauris. Proin dictum ligula at leo 
                blandit congue ac vel risus. Nunc tristique tortor eget sem 
                sagittis, nec lacinia mauris aliquam. Curabitur elit ligula, 
                venenatis a odio eu, vestibulum eleifend mi. Donec erat turpis, 
                ultricies in nisi vehicula, aliquet convallis orci. Curabitur 
                eu nulla quis odio venenatis dapibus quis feugiat metus. Nullam 
                porta velit odio, et aliquet lorem finibus in. In nec tortor 
                efficitur, interdum mauris in, ullamcorper ante. Sed quam 
                felis, fermentum in mi vitae, cursus maximus lorem. <br />

                Donec vitae quam ex. Vivamus facilisis velit nec laoreet 
                tristique. Proin dignissim dictum leo, ut congue nunc vulputate 
                a. Nulla dui nisi, viverra sed dictum ut, elementum ac nulla. 
                Sed ac porta arcu. Nulla diam est, faucibus eget lectus nec, 
                placerat ornare augue. Donec ullamcorper cursus velit, sed 
                sodales enim egestas eu. Mauris blandit hendrerit orci id 
                molestie. Nullam ut interdum massa, vitae congue metus. Vivamus 
                mollis sollicitudin purus, ac sagittis metus elementum sit 
                amet. Phasellus vitae facilisis arcu. Mauris pretium ac nulla 
                vitae gravida. Donec tempor urna tellus, ac porta quam 
                fermentum in. Proin facilisis interdum purus, tincidunt 
                vehicula quam aliquam quis. Pellentesque lobortis nunc ac 
                lectus iaculis, at dictum urna tristique. <br />
            </div>
        </div>
    )
}

export default Review