import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Job } from '../shared/models/job.model';

@Injectable()
export class JobService {

  constructor(private http: HttpClient) { }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('/api/jobs');
  }

  countJobs(): Observable<number> {
    return this.http.get<number>('/api/jobs/count');
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>('/api/job', job);
  }

  getJob(job: Job): Observable<Job> {
    return this.http.get<Job>(`/api/job/${job._id}`);
  }

  editJob(job: Job): Observable<any> {
    return this.http.put(`/api/job/${job._id}`, job, { responseType: 'text' });
  }

  deleteJob(job: Job): Observable<any> {
    return this.http.delete(`/api/job/${job._id}`, { responseType: 'text' });
  }

}
