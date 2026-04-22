export type JobStatus =
    | 'Pending'
    | 'Queued'
    | 'Processing'
    | 'Completed'
    | 'Failed';

export interface Job {
    id: string;
    status: JobStatus;
    inputText: string;
    submittedAtUtc: string;
    updatedAtUtc: string;
    completedAtUtc: string | null;
    errorMessage: string | null;
    wordCount: number | null;
    characterCount: number | null;
    lineCount: number | null;
    keywordHits: number | null;
    category: string | null;
    summary: string | null;
}