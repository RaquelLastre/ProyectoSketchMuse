import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../../features/imagenes/models/imagen.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Imagenes {
  private apiUrl = 'https://localhost:7128/api/imagenes/'

  constructor(private http: HttpClient) { }

  buscarImagenes(query: string, count: number): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(`${this.apiUrl}?query=${query}&count=${count}`)
  }
  
  guardarAlbum(query: string, imagenes: Imagen[]) {
  return this.http.post('https://localhost:7128/api/album', {
    query: query,
    imagenes: imagenes
  });
}
}
