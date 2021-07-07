import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { title: 'Funds Management Software' },
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
  },
  { path: '', data: { title: 'Legal' }, loadChildren: () => import('./modules/legal/legal.module').then(m => m.LegalModule) },
  { path: 'userpanel', data: { title: 'User Panel' }, loadChildren: () => import('./modules/user-panel/user-panel.module').then(m => m.UserPanelModule) },
  { path: '**', redirectTo: '/', data: { title: '404' } }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
