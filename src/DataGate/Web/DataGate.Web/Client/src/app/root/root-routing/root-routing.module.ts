import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/utility-services/auth-guard.service';
import { NoAuthService } from 'src/app/utility-services/no-auth.service';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("../../app-home/app-home.module").then(m => m.AppHomeModule),
    canActivate:[AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import("../../app-auth/app-auth.module").then(m => m.AppAuthModule),
    canActivate:[NoAuthService]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class RootRoutingModule {}
