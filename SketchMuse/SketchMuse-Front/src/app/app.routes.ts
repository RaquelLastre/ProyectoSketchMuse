import { Routes } from '@angular/router';
import { Main } from './features/imagenes/pages/main/main';
import { Perfil } from './features/imagenes/pages/perfil/perfil';
import { Referencias } from './features/imagenes/pages/referencias/referencias';
import { Login } from './features/imagenes/pages/login/login';
import { Register } from './features/imagenes/pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main
  },
  {
    path: 'me',
    component: Perfil,
    canActivate: [authGuard]
  },
  {
    path: 'references/:query',
    component: Referencias
  },
  {
    path: 'references',
    component: Referencias
  },
  {
    path: 'login',
    component: Login,
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    component: Register,
    canActivate: [noAuthGuard]
  }, {
    path: 'album/:id',
    component: Referencias,
    canActivate: [authGuard]
  }
];
