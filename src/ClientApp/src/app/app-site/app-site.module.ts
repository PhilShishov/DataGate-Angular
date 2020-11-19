import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { } from "@angular/material/button";
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../shared-material/material/material.module';
import { AuthApiService } from './services/auth-api.service';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    RouterModule.forChild(routes)
  ],
  providers:[AuthApiService]
})
export class AppAuthModule { }
