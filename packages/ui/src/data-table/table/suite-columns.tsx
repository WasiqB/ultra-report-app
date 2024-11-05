import { StatusCell } from '@/results/cells/status';
import { ColumnDef } from '@tanstack/react-table';
import { TestSuiteResultData } from '@ultra-reporter/utils/types';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/button';
import { CellData, SortableHeader } from '../cell-text-data';

export const suiteColumns: ColumnDef<TestSuiteResultData>[] = [
  {
    accessorKey: 'suite_name',
    header: ({ column }) => (
      <SortableHeader column={column} header='Suite Name' />
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const value = row.getValue('suite_name') as string;
      return (
        <Button
          variant='link'
          onClick={() =>
            router.push(
              `/results/${encodeURIComponent(row.original.suite_name)}`
            )
          }
        >
          {value}
        </Button>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <SortableHeader column={column} header='Status' />,
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return <StatusCell status={status} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'duration_ms',
    header: ({ column }) => (
      <SortableHeader column={column} header='Duration' />
    ),
    cell: ({ row }) => {
      const duration: string = row.getValue('duration_ms');
      return <CellData value={duration} align='right' />;
    },
  },
  {
    accessorKey: 'started_at',
    header: ({ column }) => (
      <SortableHeader column={column} header='Started At' />
    ),
    cell: ({ row }) => {
      const dateTime: string = row.getValue('started_at');
      return <CellData value={dateTime} align='right' />;
    },
  },
  {
    accessorKey: 'finished_at',
    header: ({ column }) => (
      <SortableHeader column={column} header='Finished At' />
    ),
    cell: ({ row }) => {
      const dateTime: string = row.getValue('finished_at');
      return <CellData value={dateTime} align='right' />;
    },
  },
];
