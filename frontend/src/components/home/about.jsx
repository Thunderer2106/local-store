import React from 'react'

const About = () => {
    return (
        <>
            <div className='flex my-14'>
                <div className='flex justify-end mx-2'>
                    <img src='/images/home/about.png' alt="about" className='h-[85%] '></img>

                </div>
                <div className='w-1/2 mx-auto my-5'>
                    <div className='outfit-600 text-[32px] w-[70%] mx-5'>
                        We are passionate about supporting local artisans and their businesses.
                    </div>
                    <div className='outfit-400 w-[65%] my-5 mx-5'>
                        We carefully curate our selection of products to ensure that our customers have access to the best of what local artisans have to offer.
                    </div>
                    <div className='my-7 w-[70%] mx-5'>
                        <div className='flex outfit-400 my-4'><span className='mx-1'><img src='/images/home/bullet.png'></img></span>Get high-quality products made with love and care.</div>
                        <div className='flex outfit-400 my-4'><span className='mx-1'><img src='/images/home/bullet.png'></img></span>Find products that are truly one-of-a-kind.</div>
                        <div className='flex outfit-400 my-4'><span className='mx-1'><img src='/images/home/bullet.png'></img></span>Shop with confidence knowing that you're supporting local businesses.</div>
                    </div>
                </div>

            </div>
            <div className='outfit-700 text-[32px] w-[50%] mx-auto text-center'>Discover a wide variety of products, from jewelry to home decor to apparel, all made with love by local artisans.</div>
            <div className='outfit-400 my-4 text-[18px] text-center'>Support local artisans and their passion for their craft </div>
            <hr className="border-t-1 border-black mt-11" />
            <div className='outfit-400 text-center my-4'>&copy; 2023 Local Store, All right reserved</div>
        </>
    )
}

export default About;