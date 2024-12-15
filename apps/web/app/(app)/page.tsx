import { FAQ } from '@ultra-reporter/ui/home/faq';
import { Features } from '@ultra-reporter/ui/home/feature';
import { Feedback } from '@ultra-reporter/ui/home/feedback';
import { Hero } from '@ultra-reporter/ui/home/hero';
import { HowItWorks } from '@ultra-reporter/ui/home/how-it-works';
import { NavBar } from '@ultra-reporter/ui/home/nav-bar';
import { OpenSource } from '@ultra-reporter/ui/home/open-source';
import { Sponsor } from '@ultra-reporter/ui/home/sponsor';
import { JSX } from 'react';

const LandingPage = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <main className='bg-background text-foreground container mx-auto px-4 py-16'>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <Feedback />
        <Sponsor />
        <OpenSource />
      </main>
    </>
  );
};

export default LandingPage;
