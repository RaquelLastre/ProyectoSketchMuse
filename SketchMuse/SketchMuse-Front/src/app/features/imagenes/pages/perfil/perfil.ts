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
}