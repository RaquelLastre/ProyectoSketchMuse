import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.scss',
})
export class Buscador {
  texto = ''

  @Output()
  buscar = new EventEmitter<string>()

  onBuscar() {
    const query = this.texto.trim();
    if (!query) return;
    this.buscar.emit(query);
  }
}
