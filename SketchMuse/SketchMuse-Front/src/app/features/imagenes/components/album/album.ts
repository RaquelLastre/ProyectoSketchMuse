import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [CommonModule, DatePipe],
  templateUrl: './album.html',
  styleUrl: './album.scss',
})
export class Album {
  @Input() album: any;
  @Output() eliminar = new EventEmitter<number>(); 

  constructor(private router: Router) {}

  verDetalle() {
    this.router.navigate(['/album', this.album.id]);
  }
   eliminarClick(event: Event) {
    event.stopPropagation(); // evita que navegue al clicar en el botón de eliminar
    this.eliminar.emit(this.album.id);
  }
}
