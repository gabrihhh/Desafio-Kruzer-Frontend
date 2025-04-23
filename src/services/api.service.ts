import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private FrontendUrl = 'http://localhost:3000/api/frontend';

  constructor(private http: HttpClient) {}

  refreshDados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.FrontendUrl}/refresh`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

}
