


import React from 'react';
import Image1 from "../../assets/images/image1.jpg";
import Image2 from "../../assets/images/image2.jpg";
import Image3 from "../../assets/images/image3.jpg";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageList = [
    {
        id: 1,
        img: Image3,
        Title: 'Upto 50% off on all Power Glasses',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'
    },
    {
        id: 2,
        img: Image2,
        Title: 'Upto 50% off on all Power Glasses',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'
    },
    {
        id: 3,
        img: Image1,
        Title: 'Upto 50% off on all Power Glasses',
        Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.'
    }
];

const Hero = () => {

    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: 'ease-in-out',
        pauseOnHover: false,
        pauseOnFocus: true,
        slidesToShow: 1,
    };

    return (
        <div className='relative overflow-hidden min-h-[400px] sm:min-h-[500px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/* Background Pattern */}
            <div className='h-[700px] w-[700px] bg-orange-200/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-10'></div>
            {/* Hero section */}
            <div className='container pb-8 sm:pb-0'>
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div key={data.id}>
                            <div className='grid grid-cols-1 sm:grid-cols-2'>
                                {/* Text content section */}
                                <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1 className='text-5xl sm:text-6xl lg:text-7xl font-poppins'>{data.Title}</h1>
                                    <p className='text-sm'>{data.Description}</p>
                                    <div>
                                        <button className='bg-gradient-to-r from-amber-200 to-lime-300 hover:scale-105 duration-200 text-white py-2 px-4 rounded-full'>
                                            Order Now
                                        </button>
                                    </div>
                                </div>
                                {/* Image section */}
                                <div className='order-2 sm:order-1'>
                                    <div className='relative z-10'>
                                        <img src={data.img} alt={data.Title} className='w-[300px] h-[300px] sm:h-[350px] sm:w-[350px] sm:scale-125 object-contain mx-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Hero;
