import { StatusCell } from '@/results/cells/status';
import { GearIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import {
  TestException,
  TestLog,
  TestMethodResultData,
} from '@ultra-reporter/utils/types';
import {
  CircleAlert,
  Link,
  Table2,
  Tag,
  Tags,
  TestTube,
  TestTubes,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog';
import { TooltipWrapper } from '../../utils/tooltip-wrapper';
import { CellData, SortableHeader } from '../cell-text-data';
import { AttachmentDialog } from './attachment';

export const columns: ColumnDef<TestMethodResultData>[] = [
  {
    accessorKey: 'suite_name',
    header: 'Suite Name',
    cell: ({ row }) => {
      const value = row.getValue('suite_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'test_name',
    header: 'Test Name',
    cell: ({ row }) => {
      const value = row.getValue('test_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'class_name',
    header: 'Class Name',
    cell: ({ row }) => {
      const value = row.getValue('class_name') as string;
      return <CellData value={value} />;
    },
  },
  {
    accessorKey: 'method_name',
    cell: ({ row }) => {
      const value = row.getValue('method_name') as string;
      return <CellData value={value} />;
    },
    header: ({ column }) => (
      <SortableHeader column={column} header='Method Name' />
    ),
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
    accessorKey: 'is_config',
    header: () => (
      <div className='flex max-w-10 justify-center'>
        <TooltipWrapper text='Test Type'>
          <TestTubes className='h-5 w-5' />
        </TooltipWrapper>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue('is_config');
      return (
        <TooltipWrapper text={value ? 'Configuration method' : 'Test method'}>
          <div className='flex max-w-10 justify-center'>
            {value ? (
              <GearIcon className='h-4 w-4 text-orange-600 dark:fill-orange-600' />
            ) : (
              <TestTube className='h-4 w-4 text-blue-600 dark:fill-blue-600' />
            )}
          </div>
        </TooltipWrapper>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: () => (
      <div className='flex max-w-10 justify-center'>
        <TooltipWrapper text='Groups'>
          <Tags className='h-5 w-5' />
        </TooltipWrapper>
      </div>
    ),
    cell: ({ row }) => {
      const value: string[] = row.getValue('tags');
      return (
        <div className='flex max-w-10 justify-center'>
          {value && value.length > 0 && (
            <TooltipWrapper text={value.sort().join(', ')}>
              {value.length > 1 ? (
                <Tags className='h-6 w-6 text-blue-600 dark:fill-blue-600' />
              ) : (
                <Tag className='h-4 w-4 text-blue-600 dark:fill-blue-600' />
              )}
            </TooltipWrapper>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'exception',
    header: () => (
      <div className='flex max-w-10 justify-center'>
        <TooltipWrapper text='Exception'>
          <CircleAlert className='h-4 w-4' />
        </TooltipWrapper>
      </div>
    ),
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const exception = row.getValue('exception') as TestException;
      return (
        <>
          {exception && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant='link'
                  onClick={() => setIsOpen(true)}
                  className='w-15'
                >
                  <CircleAlert className='h-4 w-4 text-red-500 dark:fill-red-500' />
                </Button>
              </DialogTrigger>
              <DialogContent className='flex flex-col sm:max-h-[90vh] sm:max-w-[90vw]'>
                <DialogHeader>
                  <DialogTitle>Exception</DialogTitle>
                  <DialogDescription>
                    Here you can see the Test related Exception
                  </DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-1 items-center gap-4'>
                    {exception ? (
                      <Card>
                        <CardHeader>
                          <CardTitle className='text-red-500'>
                            Message: {exception.message.trim()}
                          </CardTitle>
                          <CardDescription className='text-red-400'>
                            Exception class: {exception.class_name}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <pre className='mockup-code max-h-[300px] overflow-auto'>
                            {exception.stack_trace.map((line, index) => (
                              <code key={index} className='block pl-2'>
                                {line.startsWith('at') && '\t'}
                                {line.trim()}
                              </code>
                            ))}
                          </pre>
                        </CardContent>
                      </Card>
                    ) : (
                      <p>No exception for this test</p>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      );
    },
  },
  {
    accessorKey: 'attachment',
    header: () => (
      <div className='flex max-w-10 justify-center'>
        <TooltipWrapper text='Attachments'>
          <Link className='h-4 w-4' />
        </TooltipWrapper>
      </div>
    ),
    cell: ({ row }) => {
      const attachment = row.getValue('attachment') as TestLog;
      return (
        attachment && (
          <AttachmentDialog
            title='Attachment'
            description='Below is the attachment from your Test'
            attachment={attachment.line}
          />
        )
      );
    },
  },
  {
    accessorKey: 'parameters',
    header: () => (
      <div className='flex max-w-10 justify-center'>
        <TooltipWrapper text='Parameters'>
          <Table2 className='h-4 w-4' />
        </TooltipWrapper>
      </div>
    ),
    cell: ({ row }) => {
      const params = row.getValue('parameters') as string[];
      const [isOpen, setIsOpen] = useState(false);
      return (
        params &&
        params.length > 1 && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant='link'
                onClick={() => setIsOpen(true)}
                className='w-15'
              >
                <Table2 className='h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='flex flex-col sm:max-h-[90vh] sm:max-w-[90vw]'>
              <DialogHeader>
                <DialogTitle>Parameters</DialogTitle>
                <DialogDescription>
                  Here you can see the Test related Parameters
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-1 items-center gap-4'>
                  {params ? (
                    <Card>
                      <CardContent>
                        <div className='mockup-code max-h-[300px] overflow-auto'>
                          {params.map((line, index) => (
                            <pre key={index} data-prefix={index + 1}>
                              <code className='pl-2'>{line.trim()}</code>
                            </pre>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <p>No exception for this test</p>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
      );
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
