import { Component } from '@angular/core';
import { Imagen } from '../../models/imagen.model';
import { Buscador } from "../../components/buscador/buscador";
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  imports: [Buscador, CommonModule, RouterModule, FormsModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  imagenes: Imagen[] = []
  tiempoPorFoto: number = 10;
  numFotos: number = 10;

  constructor(private router: Router, private authService: Auth) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  buscar(query: string) {
    const count = Math.max(1, Math.floor(Number(this.numFotos)));
    this.router.navigate(['/references', query], { queryParams: { count: count, tiempo: this.tiempoPorFoto }  });
  }
}