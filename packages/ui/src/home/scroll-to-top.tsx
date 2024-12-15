'use client';

import { ArrowUp } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';
import { Button } from '../components/button';
import { TooltipWrapper } from '../utils/tooltip-wrapper';

export const ScrollToTop = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          className='fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform rounded-full p-2'
          onClick={scrollToTop}
          aria-label='Scroll to top'
        >
          <TooltipWrapper text='Scroll to top'>
            <ArrowUp className='h-4 w-4' />
          </TooltipWrapper>
        </Button>
      )}
    </>
  );
};
