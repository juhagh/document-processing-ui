import type { Job } from '../types/job';
import StatusBadge from './StatusBadge';

interface Props {
    jobs: Job[];
    selectedJobId: string | null;
    onSelect: (job: Job) => void;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
}

export default function JobList({ jobs, selectedJobId, onSelect }: Props) {
    if (jobs.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 text-sm">
                No jobs yet. Submit one above!
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
            {jobs.map(job => (
                <div
                    key={job.id}
                    onClick={() => onSelect(job)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedJobId === job.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">Job: {job.id}</span>
                        <StatusBadge status={job.status} />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(job.submittedAtUtc)}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{job.inputText}</p>
                </div>
            ))}
        </div>
    );
}