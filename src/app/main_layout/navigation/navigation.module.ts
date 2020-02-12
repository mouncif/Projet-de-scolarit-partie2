import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule, MatIconModule, MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FooterComponent} from '../footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
  ],
  declarations: [
    NavigationComponent,
    FooterComponent,
  ],
  exports: [
    NavigationComponent,
    FooterComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: []
})
export class NavigationModule {

}
