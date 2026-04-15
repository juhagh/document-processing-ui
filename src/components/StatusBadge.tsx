import type { JobStatus } from '../types/job';

interface Props {
    status: JobStatus;
}

const statusStyles: Record<JobStatus, string> = {
    Pending: 'bg-gray-100 text-gray-700',
    Queued: 'bg-blue-100 text-blue-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Completed: 'bg-green-100 text-green-700',
    Failed: 'bg-red-100 text-red-700',
};

export default function StatusBadge({ status }: Props) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
    );
}