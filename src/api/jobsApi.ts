import axios from 'axios';
import type { Job } from '../types/job'; // IDE requires "import type"

const api = axios.create({
    baseURL: '/api',
});

export const getJobs = (): Promise<Job[]> =>
    api.get<Job[]>('/jobs').then(r => r.data);

export const getJobById = (id: number): Promise<Job> =>
    api.get<Job>(`/jobs/${id}`).then(r => r.data);

export const createJob = (inputText: string): Promise<Job> =>
    api.post<Job>('/jobs', { inputText }).then(r => r.data);