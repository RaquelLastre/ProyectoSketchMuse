import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imagen } from '../../features/imagenes/models/imagen.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class Imagenes {
  private apiUrl = `${environment.apiUrl}/api/imagenes/`

  constructor(private http: HttpClient) { }

  buscarImagenes(query: string, count: number): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(`${this.apiUrl}?query=${query}&count=${count}`)
  }
  
  guardarAlbum(query: string, imagenes: Imagen[]) {
  return this.http.post(`${environment.apiUrl}/api/album`, {
    query: query,
    imagenes: imagenes
  });
}
}
