'use client';

import { getFlag } from '@ultra-reporter/feature-toggle/provider';
import { JSX } from 'react';
import { Description } from '../common/description';
import { Title } from '../common/title';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/accordion';

export const FAQ = (): JSX.Element | null => {
  const faq = getFlag('faq');
  if (faq && !faq.enabled) {
    return null;
  }
  return (
    <section
      id='faq'
      className='bg-background container space-y-6 py-8 md:py-12 lg:py-24 dark:bg-transparent'
    >
      <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center'>
        <Title text='Frequently Asked Questions' />
        <Description text='Find answers to common questions about Ultra Reporter' />
      </div>
      <div className='mx-auto w-full max-w-[700px]'>
        <Accordion type='single' collapsible className='w-full'>
          {JSON.parse(faq?.value).map(
            (item: { question: string; answer: string }, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </section>
  );
};
