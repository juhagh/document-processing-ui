import { useState } from 'react';
import { createJob } from '../api/jobsApi';
import type { Job } from '../types/job';

interface Props {
    onJobCreated: (job: Job) => void;
}

export default function SubmitJobForm({ onJobCreated }: Props) {
    const [inputText, setInputText] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!inputText.trim()) return;
        setSubmitting(true);
        setError(null);
        try {
            const job = await createJob(inputText);
            onJobCreated(job);
            setInputText('');
        } catch {
            setError('Failed to submit job. Is the API running?');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Submit New Job</h2>
            <textarea
                className="w-full border border-gray-300 rounded-md p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter document text..."
                value={inputText}
                onChange={e => setInputText(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleSubmit}
                disabled={submitting || !inputText.trim()}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {submitting ? 'Submitting...' : 'Submit Job'}
            </button>
        </div>
    );
}