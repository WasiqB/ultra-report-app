'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const SLIDE_DURATION = 5000;

const demoSlides = [
  {
    src: '/report-1.png',
    alt: 'Dashboard Overview',
    caption: 'Powerful Analytics Dashboard',
  },
  {
    src: '/report-2.png',
    alt: 'Report Generation',
    caption: 'Automated Report Generation',
  },
  {
    src: '/report-3.png',
    alt: 'Data Insights',
    caption: 'AI-Powered Insights',
  },
];

export function DemoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % demoSlides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='relative h-full w-full'>
      {demoSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className='rounded-lg object-cover shadow-xl'
            priority={index === 0}
          />
          <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6'>
            <p className='text-xl font-medium text-white'>{slide.caption}</p>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2'>
        {demoSlides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-4 bg-white'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
