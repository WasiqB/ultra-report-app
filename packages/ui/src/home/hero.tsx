'use client';

import { getFlag } from '@ultra-reporter/feature-toggle/provider';
import Image from 'next/image';
import { JSX } from 'react';
import { FileUpload } from '../utils/file-upload';

export const Hero = (): JSX.Element => {
  const signInSupport = getFlag('sign_in_support');
  return (
    <section className='flex flex-col items-center gap-4 p-16'>
      <div className='flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:gap-12'>
        <div className='flex flex-col items-center gap-4 text-center md:items-center md:text-left'>
          <h1 className='text-left text-3xl font-bold md:text-6xl'>
            Convert your Test results to
            <br />
            <span className='gradient-text'>Beautiful Report</span>
            <br />
            in one click
          </h1>
          {!signInSupport?.enabled && (
            <div className='w-full max-w-sm pt-8'>
              <FileUpload />
            </div>
          )}
        </div>
        <div className='w-full max-w-lg items-end'>
          <Image
            src='/report-1.png'
            width={600}
            height={600}
            alt='Ultra Reporter Sample Report'
            className='dark:shadow-muted-foreground rounded-lg border align-middle shadow-lg'
            priority
          />
        </div>
      </div>
    </section>
  );
};
