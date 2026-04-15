import type { Job } from '../types/job';
import StatusBadge from './StatusBadge';

interface Props {
    job: Job;
}

function formatDate(dateString: string | null): string {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString();
}

export default function JobDetail({ job }: Props) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Job #{job.id}</h2>
                <StatusBadge status={job.status} />
            </div>

            {(job.status === 'Queued' || job.status === 'Processing') && (
                <div className="flex items-center gap-2 text-blue-600 text-sm mb-4">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span className="animate-pulse">Processing your document...</span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                    <p className="text-gray-500">Submitted</p>
                    <p className="text-gray-800">{formatDate(job.submittedAtUtc)}</p>
                </div>
                <div>
                    <p className="text-gray-500">Completed</p>
                    <p className="text-gray-800">{formatDate(job.completedAtUtc)}</p>
                </div>
                <div>
                    <p className="text-gray-500">Category</p>
                    <p className="text-gray-800">{job.category ?? '—'}</p>
                </div>
                <div>
                    <p className="text-gray-500">Keyword Hits</p>
                    <p className="text-gray-800">{job.keywordHits ?? '—'}</p>
                </div>
            </div>

            {job.status === 'Failed' && job.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                    <p className="text-red-700 text-sm">{job.errorMessage}</p>
                </div>
            )}

            {job.wordCount !== null && (
                <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-md p-4 mb-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{job.wordCount}</p>
                        <p className="text-xs text-gray-500 mt-1">Words</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{job.characterCount}</p>
                        <p className="text-xs text-gray-500 mt-1">Characters</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{job.lineCount}</p>
                        <p className="text-xs text-gray-500 mt-1">Lines</p>
                    </div>
                </div>
            )}

            {job.summary && (
                <div>
                    <p className="text-gray-500 text-sm mb-1">Summary</p>
                    <p className="text-gray-800 text-sm bg-gray-50 rounded-md p-3">{job.summary}</p>
                </div>
            )}
        </div>
    );
}