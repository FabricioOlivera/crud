import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private Url = 'https://ibillboard.com/api/positions';

  constructor(private _http: HttpClient) {}

  getPositions(): Observable<Position> {
    return this._http.get<Position>(this.Url);
  }

 


}

