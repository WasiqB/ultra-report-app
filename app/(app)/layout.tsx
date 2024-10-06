import type { Metadata } from 'next';
import './globals.css';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';
import { Footer } from '@/components/home/footer';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'Ultra Reporter',
  description: 'Generate beautiful reports for your test results',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): DetailedHTMLProps<
  HtmlHTMLAttributes<HTMLHtmlElement>,
  HTMLHtmlElement
> => {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <body className={'antialiased'}>
        {children}
        <Footer />
      </body>
      {process.env.VERCEL_ENV === 'production' && (
        <GoogleAnalytics gaId='G-CNW9F6PH7P' />
      )}
    </html>
  );
};

export default RootLayout;
