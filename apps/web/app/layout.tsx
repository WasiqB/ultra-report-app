import { GoogleAnalytics } from '@next/third-parties/google';
import { Provider as AnalyticsProvider } from '@ultra-reporter/analytics/client';
import { getFeatureState } from '@ultra-reporter/feature-toggle/client';
import { FeatureProvider } from '@ultra-reporter/feature-toggle/provider';
import '@ultra-reporter/ui/global.css';
import { Footer } from '@ultra-reporter/ui/home/footer';
import { ScrollToTop } from '@ultra-reporter/ui/home/scroll-to-top';
import { ThemeProvider } from '@ultra-reporter/ui/utils/theme-provider';
import { isProd } from '@ultra-reporter/utils/constants';
import type { Metadata } from 'next';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Ultra Reporter - Beautiful Test Reports in One Click',
    template: '%s | Ultra Reporter',
  },
  description:
    'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
  keywords: [
    'TestNG',
    'TestNG Reporter',
    'test reports',
    'test visualization',
    'QA tools',
    'software testing',
    'Ultra Reporter',
    'TestNG reports',
    'TestNG visualization',
  ],
  authors: [{ name: 'Wasiq Bhamla' }],
  creator: 'Wasiq Bhamla',
  publisher: 'Wasiq Bhamla',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ultra-reporter.com',
    title: 'Ultra Reporter - Beautiful Test Reports in One Click',
    description:
      'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
    siteName: 'Ultra Reporter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ultra Reporter - Beautiful Test Reports in One Click',
    description:
      'Convert your TestNG test results into beautiful, comprehensive reports instantly with Ultra Reporter. Visualize your data and improve your testing workflow.',
    creator: '@WasiqBhamla',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<
  DetailedHTMLProps<HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>
> => {
  const featureState = await getFeatureState();
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.png' sizes='any' type='image/png' />
      </head>
      <FeatureProvider serverState={featureState}>
        <>
          <body className={'antialiased'}>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <ScrollToTop />
              <Footer />
              {isProd && <AnalyticsProvider />}
            </ThemeProvider>
          </body>
          {isProd && <GoogleAnalytics gaId='G-CNW9F6PH7P' />}
        </>
      </FeatureProvider>
    </html>
  );
};

export default RootLayout;
