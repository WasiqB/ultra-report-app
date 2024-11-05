import { ColumnDef } from '@tanstack/react-table';
import { TestResultData } from '@ultra-reporter/utils/types';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/button';
import { SortableHeader } from '../cell-text-data';

export const testColumns: ColumnDef<TestResultData>[] = [
  {
    accessorKey: 'test_name',
    header: ({ column }) => (
      <SortableHeader column={column} header='Test Name' />
    ),
    cell: ({ row }) => {
      const router = useRouter();
      const value = row.getValue('test_name') as string;
      return (
        <Button
          variant='link'
          onClick={() =>
            router.push(
              `/results/${row.original.suite_name}/${row.original.test_name}`
            )
          }
        >
          {value}
        </Button>
      );
    },
  },
  // Add other relevant columns for test level data
];
