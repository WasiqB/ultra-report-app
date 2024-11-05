'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { AreaChartComponent } from '@ultra-reporter/ui/charts/area-chart';
import { barConfig, chartConfig } from '@ultra-reporter/ui/charts/chart-props';
import { DoughNutComponent } from '@ultra-reporter/ui/charts/dough-nut-chart';
import { PieComponent } from '@ultra-reporter/ui/charts/pie-chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ultra-reporter/ui/components/card';
import { Skeleton } from '@ultra-reporter/ui/components/skeleton';
import { getFormattedData } from '@ultra-reporter/ui/data';
import { DataTable } from '@ultra-reporter/ui/data-table/data-table';
import { suiteColumns } from '@ultra-reporter/ui/data-table/table/suite-columns';
import { NavBar } from '@ultra-reporter/ui/home/nav-bar';
import { BreadcrumbNav } from '@ultra-reporter/ui/results/breadcrumb-nav';
import { cn } from '@ultra-reporter/utils/cn';
import {
  FormattedData,
  ProcessedData,
  TestClassResultData,
  TestMethodResultData,
  TestResultData,
  TestSuiteResultData,
} from '@ultra-reporter/utils/types';
import { useEffect, useState } from 'react';

const ResultsPage = (): JSX.Element => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [suites, setSuites] = useState<TestSuiteResultData[]>([]);
  const [tests, setTests] = useState<TestResultData[]>([]);
  const [classes, setClasses] = useState<TestClassResultData[]>([]);
  const [methods, setMethods] = useState<TestMethodResultData[]>([]);
  const [formattedData, setFormattedData] = useState<FormattedData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const resultData = localStorage.getItem('json-data') as string;
    if (resultData) {
      const { suites, tests, classes, methods }: ProcessedData =
        JSON.parse(resultData);
      setSuites(suites);
      setTests(tests);
      setClasses(classes);
      setMethods(methods);
      setFormattedData(getFormattedData(suites));
    }
    setIsLoading(false);
  }, []);

  const breadcrumbItems = [{ label: 'All Suites', href: '/results' }];

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
        <BreadcrumbNav items={breadcrumbItems} />
        <section className='container mx-auto space-y-6 p-4'>
          <Card className='bg-card text-card-foreground'>
            <CardHeader className='items-center pb-5'>
              <CardTitle className='text-xl'>Test Statistics</CardTitle>
              <CardDescription>
                Overall Test execution statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
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
          {areaChartData && areaChartData.length > 0 && (
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
          )}
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
              ) : suites ? (
                <DataTable
                  columns={suiteColumns}
                  data={suites}
                  filterColumn='suite_name'
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
