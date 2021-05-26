import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  { path: '', data: { title: 'Funds Management Software' }, loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule) },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }