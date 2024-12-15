import { JSX } from 'react';
import { Description } from '../common/description';
import { Title } from '../common/title';
import { Card, CardContent } from '../components/card';

const steps = [
  {
    title: 'Upload TestNG XML File',
    description:
      'Simply drag and drop your TestNG test results XML file or click to browse',
  },
  {
    title: 'Automatic Processing',
    description: 'Our system analyzes and processes your test data instantly',
  },
  {
    title: 'Generate Report',
    description:
      'Get a beautiful, comprehensive report with visualizations and insights',
  },
];

export const HowItWorks = (): JSX.Element => {
  return (
    <section id='how-it-works' className='container mb-16 mt-16'>
      <div className='mx-auto mb-8 flex flex-col items-center space-y-4 text-center'>
        <Title text='How It Works?' />
        <Description
          text='Transform your TestNG test results into beautiful reports in three
          simple steps'
        />
      </div>
      <div className='mx-auto grid max-w-5xl gap-8 rounded-md pb-8 md:grid-cols-3'>
        {steps.map((step, index) => (
          <Card key={step.title}>
            <CardContent className='pt-6'>
              <div className='space-y-4'>
                <div className='bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold'>
                  {index + 1}
                </div>
                <h3 className='text-xl font-bold'>{step.title}</h3>
                <p className='text-muted-foreground'>{step.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='bg-background mx-auto max-w-5xl rounded-lg border p-8'>
        <div
          className='relative'
          style={{ paddingBottom: '56.25%', height: 0 }}
        >
          <iframe
            src='https://www.youtube.com/embed/l2pk7LAq50I'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='absolute left-0 top-0 h-full w-full rounded-lg'
          ></iframe>
        </div>
      </div>
    </section>
  );
};
