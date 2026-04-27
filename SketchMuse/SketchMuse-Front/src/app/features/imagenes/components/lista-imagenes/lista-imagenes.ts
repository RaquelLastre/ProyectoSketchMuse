import { Component, Input } from '@angular/core';
import { Imagen } from '../../models/imagen.model';

@Component({
  selector: 'app-lista-imagenes',
  imports: [],
  templateUrl: './lista-imagenes.html',
  styleUrl: './lista-imagenes.scss',
})
export class ListaImagenes {
  @Input() imagenes: Imagen[] = [];

  indiceActual = 0;

  siguiente() {
    if (this.indiceActual < this.imagenes.length - 1) {
      this.indiceActual++;
    }
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }
}