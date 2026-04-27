import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = 'https://localhost:7128/api/albumes';

  constructor(private http: HttpClient) { }

  getMisAlbumes() {
    return this.http.get<any[]>(`${this.apiUrl}/user-albumes`);
  }
  getImagenesAlbum(albumId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${albumId}/imagenes`);
  }
}