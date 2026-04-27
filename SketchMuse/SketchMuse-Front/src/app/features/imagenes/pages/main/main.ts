import { Component } from '@angular/core';
import { Imagen } from '../../models/imagen.model';
import { Buscador } from "../../components/buscador/buscador";
import { Auth } from '../../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Buscador, CommonModule, RouterModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  imagenes: Imagen[] = []

  constructor(private router: Router, private authService: Auth) { }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  buscar(query: string) {
    this.router.navigate(['/references', query]);
  }
}