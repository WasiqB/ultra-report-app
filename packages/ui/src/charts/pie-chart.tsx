'use client';

import { Pie, PieChart } from 'recharts';

import { ChartData } from '@ultra-reporter/utils/types';
import { JSX } from 'react';
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../components/chart';

interface PieProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  footer?: string;
}

export const PieComponent = ({
  config,
  data,
  title,
  description,
  footer,
}: PieProps): JSX.Element => {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-5'>
        <CardTitle className='text-xl'>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={config}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <ChartLegend
              className='pb-2'
              align='left'
              content={<ChartLegendContent />}
            />
            <Pie
              data={data}
              dataKey='total'
              nameKey='status'
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      {footer && (
        <CardFooter className='flex-col gap-2 text-sm'>
          <div className='text-muted-foreground leading-none'>{footer}</div>
        </CardFooter>
      )}
    </Card>
  );
};
