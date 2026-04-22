import { useState } from 'react';
import { getJobById } from '../api/jobsApi';
import type { Job } from '../types/job';
import JobDetail from './JobDetail';
import { validate as uuidValidate } from 'uuid';

export default function GetJobById() {
    const [jobId, setJobId] = useState('');
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
            const id = jobId;
        if (!uuidValidate(id)) {
            setError('Please enter a valid job ID.');
            return;
        }

        setLoading(true);
        setError(null);
        setJob(null);

        try {
            const result = await getJobById(id);
            setJob(result);
        } catch {
            setError(`Job ${id} was not found.`);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Find Job by ID</h2>
            <div className="flex gap-2">
                <input
                    type="string"
                    className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                    placeholder="Job GUID..."
                    value={jobId}
                    onChange={e => setJobId(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading || !jobId.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Searching...' : 'Find'}
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-3">{error}</p>
            )}

            {job && (
                <div className="mt-4">
                    <JobDetail job={job} />
                </div>
            )}
        </div>
    );
}