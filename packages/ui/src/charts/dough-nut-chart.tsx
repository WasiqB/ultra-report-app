import { ChartData } from '@ultra-reporter/utils/types';
import { JSX } from 'react';
import { Label, Pie, PieChart } from 'recharts';
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

interface DoughNutProps {
  title: string;
  description?: string;
  config: ChartConfig;
  data: ChartData[];
  totalValue: number;
  valueLabel: string;
  footer?: string;
}

export const DoughNutComponent = ({
  title,
  description,
  config,
  data,
  totalValue,
  valueLabel,
  footer,
}: DoughNutProps): JSX.Element => {
  return (
    <Card>
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
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          {valueLabel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
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
