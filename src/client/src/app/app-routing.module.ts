import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

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
  { path: 'funds', data: { title: 'Funds' }, loadChildren: () => import('./modules/fund/fund.module').then(m => m.FundModule) },
  { path: 'subfunds', data: { title: 'Sub Funds' }, loadChildren: () => import('./modules/sub-fund/sub-fund.module').then(m => m.SubFundModule) },
  { path: 'shareclasses', data: { title: 'Share Classes' }, loadChildren: () => import('./modules/share-class/share-class.module').then(m => m.ShareClassModule) },
  { path: 'search-results', data: { title: 'Search Results' }, loadChildren: () => import('./modules/search-result/search-result.module').then(m => m.SearchResultModule) },
  { path: 'sc', data: { title: 'Share Classes' }, loadChildren: () => import('./modules/share-class/share-class.module').then(m => m.ShareClassModule) },
  { path: 'admin', data: { title: 'Admin' }, loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
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
