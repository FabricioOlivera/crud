import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableNotification } from 'rxjs';
import { Employe } from '../models/employe.model';

@Injectable({
  providedIn: 'root',
})
export class EmployesService {
  private Url = 'http://localhost:8080/api/v1/employes';

  constructor(private _http: HttpClient) {}

  getEmployes(): Observable<Employe[]> {
    return this._http.get<Employe[]>(this.Url);
  }

  saveEmployee(employe: any): Observable<any>
  {
    return this._http.post(this.Url, employe);
  }


  editEmploye(id: string, employe: Employe): Observable<any>
  {
   return  this._http.put(`${this._http}/${id}`, employe); 
  }


  getIdEmploye(id: string): Observable<any>
  {
     return this._http.get(`${this.Url}/${id}`);
  }

  deleteEmploye(id: string): Observable<any>
  {
     return this._http.delete(`${this.Url}/${id}`);
  }
}

