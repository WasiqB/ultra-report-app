import { HeartIcon } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';
import { RainbowButton } from '../components/rainbow-button';

export const Sponsor = (): JSX.Element => {
  return (
    <section className='bg-gradient-to-r from-purple-500 to-indigo-600 py-16 text-white'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='mb-4 text-3xl font-bold'>Support Ultra Reporter</h2>
        <p className='mb-8 text-xl'>
          Help us keep improving and maintaining this project by becoming a
          sponsor!
        </p>
        <Link href='https://github.com/sponsors/WasiqB'>
          <RainbowButton>
            <HeartIcon className='mr-2 h-5 w-5 text-red-500' />
            Become a Sponsor
          </RainbowButton>
        </Link>
      </div>
    </section>
  );
};
