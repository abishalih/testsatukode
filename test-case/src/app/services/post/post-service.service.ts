import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getListPost(): Observable<any[]> {
    let url = this.apiUrl;
    return this.http.get<any[]>(url);
  }

  getPostComment(id:number): Observable<any[]> {
    let url = `${this.apiUrl}/${id}/comments`;
    return this.http.get<any[]>(url);
  }

  getPost(id:number): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }
}
