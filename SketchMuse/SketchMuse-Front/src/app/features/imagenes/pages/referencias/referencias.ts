import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../../../core/services/album/album-service';
import { Imagenes } from '../../../../core/services/imagenes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referencias',
  imports: [CommonModule],
  templateUrl: './referencias.html',
  styleUrl: './referencias.scss',
})
export class Referencias implements OnInit, OnDestroy {
  imagenes: any[] = [];
  tiempoPorFoto: number = 10;
  indiceActual: number = 0;
  tiempoRestante: number = 0;

  private intervalo: any = null;

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef,
    private imagenesService: Imagenes
  ) {}

  ngOnInit() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    const query = this.route.snapshot.paramMap.get('query');
    const count = Number(this.route.snapshot.queryParamMap.get('count')) || 10;
    this.tiempoPorFoto = Number(this.route.snapshot.queryParamMap.get('tiempo')) || 10;

    if (albumId) {
      this.albumService.getImagenesAlbum(albumId).subscribe({
        next: data => {
          this.imagenes = data;
          this.iniciarCronometro();
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    } else if (query) {
      this.imagenesService.buscarImagenes(query, count).subscribe({
        next: data => {
          this.imagenes = data;
          this.iniciarCronometro();
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    }
  }

  ngOnDestroy() {
    this.detenerCronometro();
  }

  get imagenActual(): any {
    return this.imagenes[this.indiceActual] ?? null;
  }

  get progreso(): number {
    return ((this.tiempoPorFoto - this.tiempoRestante) / this.tiempoPorFoto) * 100;
  }

  irA(indice: number) {
    if (indice < 0 || indice >= this.imagenes.length) return;
    this.indiceActual = indice;
    this.iniciarCronometro();
  }

  anterior() { this.irA(this.indiceActual - 1); }
  siguiente() { this.irA(this.indiceActual + 1); }

  private iniciarCronometro() {
    this.detenerCronometro();
    this.tiempoRestante = this.tiempoPorFoto;

    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      this.cdr.detectChanges();

      if (this.tiempoRestante <= 0) {
        const siguiente = this.indiceActual + 1;
        if (siguiente < this.imagenes.length) {
          this.indiceActual = siguiente;
          this.tiempoRestante = this.tiempoPorFoto;
        } else {
          this.detenerCronometro();
        }
      }
    }, 1000);
  }

  private detenerCronometro() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }
}