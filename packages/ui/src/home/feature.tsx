import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  BarChartIcon,
  CircleAlert,
  Group,
  MousePointerClick,
  ParkingCircle,
  Table,
  Timer,
} from 'lucide-react';
import { JSX } from 'react';

const features = [
  {
    title: 'One Click',
    description: 'Generate your Test execution report in one click',
    icon: MousePointerClick,
  },
  {
    title: 'Test Visualization',
    description: 'Generate insightful charts and graphs from your data',
    icon: BarChartIcon,
  },
  {
    title: 'Test Execution Trends',
    description: 'Analyze your test execution trends over time',
    icon: Timer,
  },
  {
    title: 'Detailed Results',
    description:
      'Dive deep into your test results with comprehensive details in the Table',
    icon: Table,
  },
  {
    title: 'View Attachments',
    description: 'View your tests attachments like Screenshots and Texts',
    icon: MagnifyingGlassIcon,
  },
  {
    title: 'View Exceptions',
    description: 'View your tests exceptions and Errors',
    icon: CircleAlert,
  },
  {
    title: 'View Groups',
    description: 'View your tests groups in which they are categorized',
    icon: Group,
  },
  {
    title: 'View Test Parameters',
    description: 'View your tests parameters and their values',
    icon: ParkingCircle,
  },
];

export const Features = (): JSX.Element => {
  return (
    <section className='mb-16 mt-16' id='features'>
      <h2 className='text-foreground mb-8 text-center text-3xl font-bold'>
        Features
      </h2>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        {features.map((feature, index) => (
          <div key={index} className='bg-card rounded-lg p-6 shadow-lg'>
            <feature.icon className='text-foreground mb-4 h-12 w-12' />
            <h3 className='text-foreground mb-2 text-xl font-semibold'>
              {feature.title}
            </h3>
            <p className='text-muted-foreground'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
