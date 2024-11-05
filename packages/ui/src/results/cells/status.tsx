import { Badge } from '@/components/badge';
import { cn } from '@ultra-reporter/utils/cn';
import { AlertTriangle, Check, X } from 'lucide-react';

interface StatusProps {
  status: string;
}

export const statuses = [
  {
    value: 'pass',
    label: 'Passed',
    icon: Check,
    badge_style: 'bg-green-100 hover:bg-green-300 text-green-800',
    label_style: 'text-green-500',
  },
  {
    value: 'fail',
    label: 'Failed',
    icon: X,
    badge_style: 'bg-red-100 hover:bg-red-300 text-red-800',
    label_style: 'text-red-500',
  },
  {
    value: 'skip',
    label: 'Skipped',
    icon: AlertTriangle,
    badge_style: 'bg-yellow-100 hover:bg-yellow-300 text-yellow-800',
    label_style: 'text-yellow-500',
  },
];

export const StatusCell = ({ status }: StatusProps): JSX.Element | null => {
  const foundStatus = statuses.find((s) => s.value === status);
  if (!foundStatus) {
    return null;
  }
  return (
    <div className='flex items-center'>
      <Badge
        variant='outline'
        className={cn('px-2 py-1', {
          'bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-300':
            status === 'pass',
          'bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-300':
            status === 'fail',
          'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/30 dark:text-yellow-300':
            status === 'skip',
          'bg-gray-500/20 text-gray-700 dark:bg-gray-500/30 dark:text-gray-300':
            status === 'ignored',
        })}
      >
        <foundStatus.icon className={cn('mr-2 h-4 w-4')} />
        {foundStatus.label}
      </Badge>
    </div>
  );
};
