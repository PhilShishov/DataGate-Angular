import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { } from "@angular/material/button";
import { MaterialModule } from '../shared-material/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './services/auth-api.service';
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: '', redirectTo: "signin", pathMatch: "full" },
  { path: 'signin', component: SigninComponent }
]

@NgModule({
  declarations: [SigninComponent],
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
