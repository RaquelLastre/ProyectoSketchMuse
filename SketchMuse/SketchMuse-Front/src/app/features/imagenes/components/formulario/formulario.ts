import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule, RouterModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export class Formulario {
  @Input() tipo: 'login' | 'register' = 'login';

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit() {
    const accion = this.tipo === 'login'
      ? this.authService.login(this.email, this.password)
      : this.authService.register(this.email, this.password);

    accion.subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/me']);
      },
      error: (err) => {
        this.error = this.tipo === 'login'
          ? 'Email o contraseña incorrectos'
          : err.error?.message || 'Error en registro';
        this.cdr.detectChanges();
      }
    });
  }
}
