import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLoginRoutingModule } from './auth-login-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthLoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatCardModule,
    MatInputModule
  ], 
  exports: [
    LoginComponent
  ]
})
export class AuthLoginModule { }
