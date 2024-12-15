import { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { JSX } from 'react';
import { Button } from '../components/button';
import { TooltipWrapper } from '../utils/tooltip-wrapper';

export function CellData({
  value,
  size = 60,
  align = 'left',
}: {
  value: string;
  size?: number;
  align?: 'left' | 'right' | 'center';
}): JSX.Element {
  return (
    <TooltipWrapper text={value}>
      <div
        className={`max-w-[${size}px] truncate ${
          align === 'left'
            ? 'text-left'
            : align === 'right'
              ? 'text-right'
              : 'text-center'
        } font-medium`}
      >
        {value}
      </div>
    </TooltipWrapper>
  );
}

export function SortableHeader<TData>({
  column,
  header,
}: {
  column: Column<TData>;
  header: string;
}): JSX.Element {
  return (
    <Button
      variant='ghost'
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {header}
      <ArrowUpDown className='ml-2 h-4 w-4' />
    </Button>
  );
}
