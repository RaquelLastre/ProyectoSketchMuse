import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album',
  imports: [CommonModule, DatePipe],
  templateUrl: './album.html',
  styleUrl: './album.scss',
})
export class Album {
  @Input() album: any;
  constructor(private router: Router) {}

  verDetalle() {
    this.router.navigate(['/album', this.album.id]);
  }
}
