import { MessageSquareIcon } from 'lucide-react';
import Link from 'next/link';
import { JSX } from 'react';
import { Button } from '../components/button';

export const Feedback = (): JSX.Element => {
  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='mb-4 text-3xl font-bold'>We Value Your Feedback</h2>
        <p className='mb-8 text-xl'>
          Help us improve Ultra Reporter by sharing your ideas and suggestions!
        </p>
        <Link href='https://github.com/WasiqB/ultra-reporter-app/discussions/new/choose'>
          <Button size='lg'>
            <MessageSquareIcon className='mr-2 h-5 w-5' />
            Share Your Feedback
          </Button>
        </Link>
      </div>
    </section>
  );
};
