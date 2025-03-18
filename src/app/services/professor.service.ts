import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private readonly urlBase = 'https://localhost:7075';

  constructor(private http: HttpClient) { }

  listar(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/professor/listar`);
  }

  obter(id: any): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/professor/obter/${id}`);
  }

  adicionar(professor: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/professor/adicionar`, professor);
  }

  atualizar(professor: any): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/professor/atualizar`, professor);
  }

  remover(id: any): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/professor/remover/${id}`);
  }
}
