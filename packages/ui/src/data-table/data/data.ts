import {
  formatDateTime,
  formatDateWithFormat,
  formatDuration,
  round,
  toDuration,
} from '@ultra-reporter/utils/formatting';
import {
  AreaChartData,
  ChartData,
  FormattedData,
  ProcessedData,
  TestClassResultData,
  TestMethodResultData,
  TestResult,
  TestResultData,
  TestSuiteResultData,
} from '@ultra-reporter/utils/types';

export const getData = (data: TestResult): ProcessedData => {
  const suiteResults: TestSuiteResultData[] = [];
  const testResults: TestResultData[] = [];
  const classResults: TestClassResultData[] = [];
  const methodResults: TestMethodResultData[] = [];
  const suites = data.test_suites;

  for (const suite of suites) {
    suiteResults.push({
      suite_name: suite.name,
      status: suite.failed === 0 ? 'pass' : 'fail',
      duration_ms: formatDuration(suite.duration_ms),
      started_at: formatDateTime(suite.started_at).time,
      finished_at: formatDateTime(suite.finished_at).time,
      run_date: formatDateTime(suite.started_at).date,
    });

    for (const test of suite.test_cases) {
      testResults.push({
        suite_name: suite.name,
        test_name: test.name,
        status: test.failed === 0 ? 'pass' : 'fail',
        duration_ms: formatDuration(test.duration_ms),
        started_at: formatDateTime(test.started_at).time,
        finished_at: formatDateTime(test.finished_at).time,
        run_date: formatDateTime(test.started_at).date,
      });

      for (const cls of test.test_classes) {
        let start_at: string = '';
        let finish_at: string = '';
        let duration: number = 0;

        for (const method of cls.test_methods) {
          if (start_at !== '') {
            start_at = formatDateTime(method.started_at).time;
          }
          finish_at = formatDateTime(method.finished_at).time;

          methodResults.push({
            run_date: formatDateTime(method.started_at).date,
            suite_name: suite.name,
            test_name: test.name,
            class_name: cls.name?.substring(cls.name.lastIndexOf('.') + 1),
            method_name: method.description || method.name,
            is_config: method.is_config,
            tags: method.tags || [],
            parameters: method.parameters || [],
            status: method.status.toLowerCase(),
            exception: method.exception,
            attachment: method.log,
            started_at: formatDateTime(method.started_at).time,
            finished_at: formatDateTime(method.finished_at).time,
            duration_ms: formatDuration(method.duration_ms),
          });
        }

        classResults.push({
          suite_name: suite.name,
          test_name: test.name,
          class_name: cls.name,
          status: cls.failed === 0 ? 'pass' : 'fail',
          duration_ms: formatDuration(duration),
          started_at: start_at,
          finished_at: finish_at,
          run_date: formatDateTime(test.started_at).date,
        });
      }
    }
  }
  return {
    suites: suiteResults,
    tests: testResults,
    classes: classResults,
    methods: methodResults,
  };
};

export const getFormattedData = (
  data:
    | TestSuiteResultData[]
    | TestResultData[]
    | TestClassResultData[]
    | TestMethodResultData[]
): FormattedData => {
  const statusCounts = {
    pass: 0,
    fail: 0,
    skip: 0,
    ignored: 0,
  };

  data.forEach((item) => {
    if (item.status in statusCounts) {
      statusCounts[item.status as keyof typeof statusCounts]++;
    }
  });

  const totalTests = data.length;
  const { pass: passed, fail: failed, skip: skipped, ignored } = statusCounts;

  const calculatePercentage = (count: number): number =>
    round((count / totalTests) * 100);

  const chartCountData: ChartData[] = [
    { status: 'pass', fill: 'var(--color-pass)', total: passed },
    { status: 'fail', fill: 'var(--color-fail)', total: failed },
    { status: 'skip', fill: 'var(--color-skip)', total: skipped },
  ];

  const chartPieData: ChartData[] = [
    {
      status: 'pass',
      total: calculatePercentage(passed),
      fill: 'var(--color-pass)',
    },
    {
      status: 'fail',
      total: calculatePercentage(failed),
      fill: 'var(--color-fail)',
    },
    {
      status: 'skip',
      total: calculatePercentage(skipped),
      fill: 'var(--color-skip)',
    },
  ];

  const areaChartData: AreaChartData[] = [];
  if (data[0] && 'method_name' in data[0] && 'class_name' in data[0]) {
    areaChartData.push(
      ...(data as TestMethodResultData[]).map((r) => {
        return {
          property: `${r.class_name} / ${r.method_name}`,
          value: toDuration(r.duration_ms),
        };
      })
    );
  }

  const date =
    data && data.length > 0
      ? formatDateWithFormat(data[0]?.run_date || '', 'MMMM d, yyyy')
      : 'N/A';

  return {
    passed,
    failed,
    skipped,
    ignored,
    date,
    totalTests,
    chartCountData,
    chartPieData,
    areaChartData,
  };
};
