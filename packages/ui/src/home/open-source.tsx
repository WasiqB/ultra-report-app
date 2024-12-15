import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';
import { RainbowButton } from '../components/rainbow-button';

export const OpenSource = (): JSX.Element => {
  return (
    <section className='mb-10 mt-16 text-center'>
      <h2 className='text-foreground mb-4 text-3xl font-bold'>
        We are proudly Open Source ❤️
      </h2>
      <p className='text-muted-foreground mb-6 text-xl'>
        Our code is open source and available on GitHub
      </p>
      <Link href='https://github.com/WasiqB/ultra-reporter-app' passHref>
        <RainbowButton>
          <StarIcon className='mr-2 h-4 w-4 fill-current' /> Mark a star on
          GitHub
        </RainbowButton>
      </Link>
    </section>
  );
};
