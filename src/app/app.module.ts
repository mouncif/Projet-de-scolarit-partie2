import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './Login/login/login.component';
import {ValidationComponent} from './Login/validation/validation.component';
import {MaterialModule} from './material/material.module';
import {AppRoutingModule} from './app.routing.module';
import {NavigationModule} from './main_layout/navigation/navigation.module';
import {IconsModule} from 'angular-bootstrap-md';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule, MatDividerModule, MatExpansionModule, MatStepperModule} from '@angular/material';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {dialogComponent} from './Login/validation/dialog/dialog.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginProfComponent } from './Login/login-prof/login-prof.component';
import { HomeComponent } from './admin/home/home.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { LoginOperateurComponent } from './admin/login-operateur/login-operateur.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ValidationComponent,
    dialogComponent,
    AccueilComponent,
    LoginProfComponent,
    HomeComponent,
    LoginAdminComponent,
    LoginOperateurComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    NavigationModule,
    IconsModule,
    MatDividerModule,
    HttpClientModule,
    MatExpansionModule,
    MatStepperModule,
    MatDialogModule,
  ],
  entryComponents: [
    dialogComponent
  ],
  providers: [AuthService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [ dialogComponent ]

})
export class AppModule { }
