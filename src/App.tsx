import { useEffect, useState, useCallback } from 'react';
import type { Job } from './types/job';
import { getJobs, getJobById } from './api/jobsApi';
import GetJobById from './components/GetJobById';
import SubmitJobForm from './components/SubmitJobForm';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';

const POLL_INTERVAL_MS = 3000;
const ACTIVE_STATUSES = ['Queued', 'Processing'];

export default function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback(async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      setError(null);
    } catch {
      setError('Failed to load jobs. Is the API running?');
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll active jobs
  useEffect(() => {
    if (!selectedJob) return;
    if (!ACTIVE_STATUSES.includes(selectedJob.status)) return;

    const interval = setInterval(async () => {
      const updated = await getJobById(selectedJob.id);
      setSelectedJob(updated);
      setJobs(prev => prev.map(j => j.id === updated.id ? updated : j));
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [selectedJob]);

  // Initial load
  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  const handleJobCreated = (job: Job) => {
    setJobs(prev => [job, ...prev]);
    setSelectedJob(job);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <h1 className="text-xl font-bold text-gray-900">Document Processing</h1>
            <p className="text-sm text-gray-500">Submit documents for analysis</p>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-6">
          <SubmitJobForm onJobCreated={handleJobCreated} />
          <GetJobById />

          {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-red-700 text-sm">
                {error}
              </div>
          )}

          {loading ? (
              <div className="text-center text-gray-500 text-sm py-12">Loading jobs...</div>
          ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    Jobs
                  </h2>
                  <JobList
                      jobs={jobs}
                      selectedJobId={selectedJob?.id ?? null}
                      onSelect={handleSelectJob}
                  />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">
                    Details
                  </h2>
                  {selectedJob ? (
                      <JobDetail job={selectedJob} />
                  ) : (
                      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 text-sm">
                        Select a job to view details
                      </div>
                  )}
                </div>
              </div>
          )}
        </main>
      </div>
  );
}