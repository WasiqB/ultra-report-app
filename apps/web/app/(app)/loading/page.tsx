/* eslint-disable @stylistic/js/max-len */
'use client';

import { Button } from '@ultra-reporter/ui/components/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { Progress } from '@ultra-reporter/ui/components/progress';
import { Bug, MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';

const LoadingPage = (): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(25);

        const response = await fetch('/api/format-data', {
          body: JSON.stringify({
            value: localStorage.getItem('xml-data'),
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get formatted data');
        }

        setProgress(75);
        const data = await response.json();

        if (!data) {
          throw new Error('No data received from server');
        }

        localStorage.setItem('json-data', JSON.stringify(data));

        setProgress(100);
        router.push('/results');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      }
    };

    fetchData();
  }, [router]);

  const handleBack = (): void => {
    router.push('/');
  };

  const handleRaiseIssue = (): void => {
    router.push(
      'https://github.com/WasiqB/ultra-reporter-app/issues/new?assignees=&labels=bug&projects=&template=bug.yml&title=%F0%9F%90%9B+New+Bug:'
    );
  };

  return (
    <div className='bg-background flex min-h-screen items-center justify-center'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Processing XML</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className='w-full' />
          {error ? (
            <div className='mt-4'>
              <h3 className='text-destructive mb-2 font-semibold'>Error:</h3>
              <p className='text-muted-foreground mb-4 text-sm'>{error}</p>
            </div>
          ) : (
            <p className='text-muted-foreground mt-4'>
              Please wait while we process your XML file...
            </p>
          )}
        </CardContent>
        {error && (
          <CardFooter className='flex justify-between'>
            <Button variant='outline' onClick={handleBack}>
              <MoveLeft className='h-6 w-6 pr-2' />
              Back
            </Button>
            <Button onClick={handleRaiseIssue}>
              <Bug className='h-6 w-6 pr-2' />
              Raise Issue
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoadingPage;
