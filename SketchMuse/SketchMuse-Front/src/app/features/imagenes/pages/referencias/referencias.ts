import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../../../core/services/album/album-service';
import { ListaImagenes } from "../../components/lista-imagenes/lista-imagenes";
import { Imagenes } from '../../../../core/services/imagenes';

@Component({
  selector: 'app-referencias',
  imports: [ListaImagenes],
  templateUrl: './referencias.html',
  styleUrl: './referencias.scss',
})
export class Referencias implements OnInit {
  imagenes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private cdr: ChangeDetectorRef,
    private imagenesService: Imagenes
  ) { }

  ngOnInit() {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));

    const query = this.route.snapshot.paramMap.get('query');

    if (albumId) {
      this.albumService.getImagenesAlbum(Number(albumId)).subscribe({
        next: data => {
          this.imagenes = data;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    } else if (query) {
      this.imagenesService.buscarImagenes(query, 10).subscribe({
        next: data => {
          this.imagenes = data;
          this.cdr.detectChanges();
        },
        error: err => console.error(err)
      });
    }
  }
}