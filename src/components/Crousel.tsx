"use client";

import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

export default function Crousel() {
    const crouselImages = [
        { template: "/images/temp2.svg" },
        { template: "/images/temp.svg" },
        { template: "/images/temp3.svg" },
        { template: "/images/temp4.svg" },
    ];

    return (
        <div className="">
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={4000}
                showIndicators={false}
                stopOnHover={false}
            >
                {crouselImages.map((item, index) => (
                    <div className="w-full aspect-[16/3] sm:aspect-[16/2] mb-10 overflow-hidden bg-no-repeat" key={index}>
                        <Image className="w-full h-full object-cover object-center" src={item.template} alt="templates" width={800} height={800}  quality={100}/>
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
