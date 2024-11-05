import { Button } from '@ultra-reporter/ui/components/button';
import Link from 'next/link';

const NotFound = (): JSX.Element => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-6xl font-bold text-gray-900 dark:text-gray-100'>
        404
      </h1>
      <h2 className='mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300'>
        Page Not Found
      </h2>
      <p className='mt-2 text-gray-600 dark:text-gray-400'>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild className='mt-8'>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
