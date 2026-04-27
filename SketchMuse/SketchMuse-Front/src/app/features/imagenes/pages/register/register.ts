import { Component } from '@angular/core';
import { Formulario } from '../../components/formulario/formulario';

@Component({
  selector: 'app-register',
  imports: [ Formulario],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {}
