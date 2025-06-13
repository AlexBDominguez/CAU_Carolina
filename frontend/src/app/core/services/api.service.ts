import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAgents(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiUrl}/agents`);
  }

  addAgent(agent: { name: string; email: string }): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiUrl}/agents`, agent);
  }

  deleteAgent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/agents/${id}`);
  }

  updateAgentStatus(id: number, status: string): Observable<Agent> {
    return this.http.put<Agent>(`${this.apiUrl}/agents/${id}/status`, { status });
  }
}
