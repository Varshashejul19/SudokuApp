import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private baseUrl = "https://sugoku.onrender.com";
  constructor(private httpClient: HttpClient) {

  }


  public getBoard(level: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/board?difficulty=` + level)
  }

  public validateBoard(board: any[][]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const formData = new URLSearchParams();
    formData.set('board', JSON.stringify(board));

    return this.httpClient.post<any>(`${this.baseUrl}/validate`, formData.toString(), { headers });
  }

  public solveBoard(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/solve`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
  }
}
