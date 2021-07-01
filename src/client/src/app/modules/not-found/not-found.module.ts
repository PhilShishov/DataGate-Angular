import { Routes } from '@angular/router';
import { IdentityLayoutModule } from './../../core/layouts/identity-layout/identity-layout.module';
import { AppLayoutModule } from './../../core/layouts/app-layout/app-layout.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

const routes : Routes = [
  {
    path: '',
  }
]

@NgModule({
  imports: [
    CommonModule,
    AppLayoutModule,
    IdentityLayoutModule
  ],
  declarations: [

  ]
})
export class NotFoundModule{
  layout
}
