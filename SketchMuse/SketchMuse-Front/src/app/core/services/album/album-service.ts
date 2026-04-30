import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private apiUrl = `${environment.apiUrl}/api/albumes`;

  constructor(private http: HttpClient) { }

  getMisAlbumes() {
    return this.http.get<any[]>(`${this.apiUrl}/user-albumes`);
  }
  getImagenesAlbum(albumId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${albumId}/imagenes`);
  }
  eliminarAlbum(albumId: number) {
  return this.http.delete(`${this.apiUrl}/delete-album/${albumId}`);
}
}