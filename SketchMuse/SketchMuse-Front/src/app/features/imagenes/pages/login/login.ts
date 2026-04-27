import { Component, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../../../core/services/auth'
import { Formulario } from '../../components/formulario/formulario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Formulario],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {}