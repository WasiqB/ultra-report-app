import { ChartConfig } from '@/components/chart';

const chartConfig: ChartConfig = {
  total: {
    label: 'Test Cases',
  },
  pass: {
    label: 'Passes',
    color: 'hsl(var(--passed))',
  },
  fail: {
    label: 'Failed',
    color: 'hsl(var(--failed))',
  },
  skip: {
    label: 'Skipped',
    color: 'hsl(var(--skipped))',
  },
  ignored: {
    label: 'Ignored',
    color: 'hsl(var(--ignored))',
  },
};

const barConfig: ChartConfig = {
  property: {
    label: 'Method',
    color: 'hsl(var(--failed))',
  },
};

export { barConfig, chartConfig };
