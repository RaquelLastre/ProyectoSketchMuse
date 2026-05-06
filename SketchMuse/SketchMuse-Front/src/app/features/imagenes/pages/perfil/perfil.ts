import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AlbumService } from '../../../../core/services/album/album-service';
import { Album } from "../../components/album/album";
import { CommonModule } from '@angular/common';
import { Auth } from '../../../../core/services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [Album, CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil implements OnInit {

  albumes: any[] = [];
  albumAEliminar: number | null = null;
  mostrarModal = false;
  eliminando = false;

  albumSeleccionado: number | null = null;
  mostrarModalConfig = false;

  tiempoPorFoto: number = 10;
  numFotos: number = 10;
  soloNuevas: boolean = false;

  constructor(private albumService: AlbumService, private authService: Auth, private cdr: ChangeDetectorRef, private router: Router) { }

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
  abrirModalConfig(albumId: number) {
    this.albumSeleccionado = albumId;
    this.mostrarModalConfig = true;
  }

  cancelar() {
    this.mostrarModal = false;
    this.albumAEliminar = null;
  }

  cancelarConfig() {
    this.mostrarModalConfig = false;
    this.albumSeleccionado = null;
    this.soloNuevas = false;
  }

  confirmarConfig() {
    if (!this.albumSeleccionado) return;

    const count = Math.max(1, Math.floor(Number(this.numFotos)));

    this.router.navigate(
      ['/album', this.albumSeleccionado],
      { queryParams: { count: count, tiempo: this.tiempoPorFoto, soloNuevas: this.soloNuevas } }
    );

    this.cancelarConfig();
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