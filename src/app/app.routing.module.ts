import {NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './Login/login/login.component';
import {ValidationComponent} from './Login/validation/validation.component';
import {AccueilComponent} from './accueil/accueil.component';
import {LoginProfComponent} from './Login/login-prof/login-prof.component';
import {HomeComponent} from './admin/home/home.component';
import {LoginAdminComponent} from './admin/login-admin/login-admin.component';
import {LoginOperateurComponent} from './admin/login-operateur/login-operateur.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/prof', component: LoginProfComponent },
  { path: 'activation', component: ValidationComponent },
  { path: 'scolarity', component: HomeComponent },
  { path: 'scolarity/admin/login', component: LoginAdminComponent },
  { path: 'scolarity/login', component: LoginOperateurComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
