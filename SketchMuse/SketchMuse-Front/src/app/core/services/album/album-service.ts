import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = `${environment.apiUrl}/api/albumes`;

  constructor(private http: HttpClient) { }

  getMisAlbumes() {
    return this.http.get<any[]>(`${this.apiUrl}/user-albumes`);
  }
  getImagenesAlbum(albumId: number, count: number, soloNuevas: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${albumId}/imagenes?count=${count}&soloNuevas=${soloNuevas}`
    );
  }
  eliminarAlbum(albumId: number) {
    return this.http.delete(`${this.apiUrl}/delete-album/${albumId}`);
  }
}