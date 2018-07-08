import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '../shared/models/project.model';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/api/projects');
  }

  countProjects(): Observable<number> {
    return this.http.get<number>('/api/projects/count');
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>('/api/project', project);
  }

  getProject(project: Project): Observable<Project> {
    return this.http.get<Project>(`/api/project/${project._id}`);
  }

  editProject(project: Project): Observable<any> {
    return this.http.put(`/api/project/${project._id}`, project, { responseType: 'text' });
  }

  deleteProject(project: Project): Observable<any> {
    return this.http.delete(`/api/project/${project._id}`, { responseType: 'text' });
  }

}
