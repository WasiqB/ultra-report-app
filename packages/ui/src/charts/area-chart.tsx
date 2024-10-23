'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/chart';
import { AreaChartData } from '@ultra-reporter/utils/types';

interface AreaChartProps {
  title: string;
  description: string;
  config: ChartConfig;
  data: AreaChartData[];
  footer?: string;
  subFooter?: string;
}

export const AreaChartComponent = ({
  title,
  description,
  config,
  data,
  footer,
  subFooter,
}: AreaChartProps): JSX.Element => {
  return (
    <Card>
      <CardHeader className='items-center pb-5'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-1 pb-5'>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 10,
              right: 10,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='property'
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.slice(0, 5)}
              hide
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='value'
              type='linear'
              fill='var(--color-property)'
              fillOpacity={0.4}
              stroke='var(--color-property)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter>
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                {footer}
              </div>
              {subFooter && (
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                  {subFooter}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
