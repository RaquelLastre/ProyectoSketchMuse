import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlbumService } from '../../../../core/services/album/album-service';
import { Album } from "../../components/album/album";
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Album, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {

  albumes: any[] = [];
  albumAEliminar: number | null = null;
  mostrarModal = false;
  eliminando = false;

  constructor(private albumService: AlbumService, private authService: Auth, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.albumService.getMisAlbumes().subscribe({
      next: data => {
        this.albumes = data;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }


  abrirModal(albumId: number) {
    this.albumAEliminar = albumId;
    this.mostrarModal = true;
  }

  cancelar() {
    this.mostrarModal = false;
    this.albumAEliminar = null;
  }

  confirmarEliminar() {
    if (!this.albumAEliminar) return;

    this.eliminando = true;

    this.albumService.eliminarAlbum(this.albumAEliminar).subscribe({
      next: () => {
        // actualizar lista
        this.albumes = this.albumes.filter(a => a.id !== this.albumAEliminar);

        // cerrar modal
        this.mostrarModal = false;
        this.albumAEliminar = null;
        this.eliminando = false;

        // forzar render paraa actualizar la vista y ver los cambios
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }
}