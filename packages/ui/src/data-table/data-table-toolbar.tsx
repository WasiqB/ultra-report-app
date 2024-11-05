import { statuses } from '@/results/cells/status';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Switch } from '../components/switch';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterColumn: string;
}

export function DataTableToolbar<TData>({
  table,
  filterColumn,
}: DataTableToolbarProps<TData>): JSX.Element {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [showConfigMethods, setShowConfigMethods] = useState(true);

  const handleShowConfig = (): void => {
    setShowConfigMethods(!showConfigMethods);
    if (showConfigMethods) {
      table.getColumn('is_config')?.setFilterValue(false);
    } else {
      table.getColumn('is_config')?.setFilterValue(null);
    }
  };

  const handleResetFilters = (): void => {
    table.resetColumnFilters();
    setShowConfigMethods(true);
  };

  return (
    <div className='flex items-center py-4'>
      <Input
        placeholder='Filter tests...'
        value={
          (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn(filterColumn)?.setFilterValue(event.target.value)
        }
        className='mr-1 max-w-sm'
      />
      {table.getColumn('status') && (
        <DataTableFacetedFilter
          column={table.getColumn('status')}
          title='Status'
          options={statuses}
        />
      )}
      <div className='ml-5 flex items-center space-x-2'>
        <Switch
          id='show-config-methods'
          checked={showConfigMethods}
          onCheckedChange={handleShowConfig}
        />
        <label htmlFor='show-config-methods'>Show Config Methods</label>
      </div>
      {isFiltered && (
        <Button
          variant='ghost'
          onClick={handleResetFilters}
          className='h-8 px-2 lg:px-3'
        >
          Reset
          <Cross2Icon className='ml-2 h-4 w-4' />
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
