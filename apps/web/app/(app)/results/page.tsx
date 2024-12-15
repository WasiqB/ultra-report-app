'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { AreaChartComponent } from '@ultra-reporter/ui/charts/area-chart';
import { DoughNutComponent } from '@ultra-reporter/ui/charts/dough-nut-chart';
import { PieComponent } from '@ultra-reporter/ui/charts/pie-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { ChartConfig } from '@ultra-reporter/ui/components/chart';
import { Skeleton } from '@ultra-reporter/ui/components/skeleton';
import { getFormattedData, TestResultData } from '@ultra-reporter/ui/data';
import { DataTable } from '@ultra-reporter/ui/data-table/data-table';
import { columns } from '@ultra-reporter/ui/data-table/table/columns';
import { NavBar } from '@ultra-reporter/ui/home/nav-bar';
import { cn } from '@ultra-reporter/utils/cn';
import { FormattedData } from '@ultra-reporter/utils/types';
import { JSX, useEffect, useState } from 'react';

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

const ResultsPage = (): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [result, setResult] = useState<TestResultData[]>([]);
  const [formattedData, setFormattedData] = useState<FormattedData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resultData = localStorage.getItem('json-data');
        if (resultData) {
          const testResult: TestResultData[] = JSON.parse(resultData);
          setResult(testResult);
          setFormattedData(getFormattedData(testResult));
          setIsLoading(false);
          return;
        }

        // If no localStorage data, try to get from cookies
        const response = await fetch('/api/get-formatted-data');
        if (response.ok) {
          const data = await response.json();
          setResult(data);
          setFormattedData(getFormattedData(data));
          // Save to localStorage for future use
          localStorage.setItem('json-data', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const {
    passed,
    failed,
    skipped,
    date,
    totalTests,
    chartCountData,
    chartPieData,
    areaChartData,
  } = formattedData || {};

  return (
    <div className='bg-background text-foreground flex min-h-screen flex-col'>
      <NavBar
        suffix={`for ${isLoading ? '...' : date}`}
        cta='Generate new Report'
        showFeedback
      />
      <main className='flex-grow'>
        <section className='container mx-auto space-y-6 p-4'>
          <Card className='bg-card text-card-foreground'>
            <CardHeader className='items-center pb-5'>
              <CardTitle className='text-xl'>Test Statistics</CardTitle>
              <CardDescription>
                Overall Test execution statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                {[
                  { label: 'Total Tests', color: 'blue' },
                  { label: 'Passed', color: 'green' },
                  { label: 'Failed', color: 'red' },
                  { label: 'Skipped', color: 'yellow' },
                ].map((item, index) => (
                  <Card
                    key={item.label}
                    className={cn('rounded-lg p-4', {
                      'bg-blue-100 dark:bg-blue-900/20': item.color === 'blue',
                      'bg-green-100 dark:bg-green-900/20':
                        item.color === 'green',
                      'bg-red-100 dark:bg-red-900/20': item.color === 'red',
                      'bg-yellow-100 dark:bg-yellow-900/20':
                        item.color === 'yellow',
                    })}
                  >
                    {isLoading ? (
                      <Skeleton className='h-16 w-full' />
                    ) : (
                      <>
                        <CardTitle
                          className={cn('mb-2 text-3xl font-bold', {
                            'text-blue-600 dark:text-blue-300':
                              item.color === 'blue',
                            'text-green-600 dark:text-green-300':
                              item.color === 'green',
                            'text-red-600 dark:text-red-300':
                              item.color === 'red',
                            'text-yellow-600 dark:text-yellow-300':
                              item.color === 'yellow',
                          })}
                        >
                          {[totalTests, passed, failed, skipped][index]}
                        </CardTitle>
                        <CardDescription
                          className={cn('font-medium', {
                            'text-blue-800 dark:text-blue-200':
                              item.color === 'blue',
                            'text-green-800 dark:text-green-200':
                              item.color === 'green',
                            'text-red-800 dark:text-red-200':
                              item.color === 'red',
                            'text-yellow-800 dark:text-yellow-200':
                              item.color === 'yellow',
                          })}
                        >
                          {item.label}
                        </CardDescription>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {isLoading ? (
              <>
                <Skeleton className='h-[300px] w-full' />
                <Skeleton className='h-[300px] w-full' />
              </>
            ) : (
              <>
                <DoughNutComponent
                  title='Test Summary Counts'
                  description='Status based distribution of Test results'
                  config={chartConfig}
                  data={chartCountData || []}
                  totalValue={totalTests || 0}
                  valueLabel='Test cases'
                />
                <PieComponent
                  title='Test Summary %'
                  description='Status based % distribution of Test results'
                  config={chartConfig}
                  data={chartPieData || []}
                />
              </>
            )}
          </div>
          <div className='grid grid-cols-1 gap-6'>
            {isLoading ? (
              <>
                <Skeleton className='h-[300px] w-full' />
              </>
            ) : (
              <>
                <AreaChartComponent
                  title='Test Execution Trends (in seconds)'
                  description='Displays the test execution time trends'
                  config={barConfig}
                  data={areaChartData || []}
                />
              </>
            )}
          </div>
          <Card>
            <CardHeader className='items-center pb-5'>
              <CardTitle className='text-xl'>Test Details</CardTitle>
              <CardDescription>
                List of all the executed test cases
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className='h-[400px] w-full' />
              ) : result ? (
                <DataTable
                  columns={columns}
                  data={result}
                  filterColumn='method_name'
                  columnFilters={columnFilters}
                  columnVisibility={columnVisibility}
                  sorting={sorting}
                  setColumnFilters={setColumnFilters}
                  setColumnVisibility={setColumnVisibility}
                  setSorting={setSorting}
                />
              ) : (
                <p className='text-center'>No data available</p>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default ResultsPage;
