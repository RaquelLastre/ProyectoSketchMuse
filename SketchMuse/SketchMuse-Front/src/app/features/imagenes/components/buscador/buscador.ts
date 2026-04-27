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

  onBuscar(){
    this.buscar.emit(this.texto)
  }
}
