import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from 'src/app/utility-services/auth-guard.service';
import { NoAuthService } from 'src/app/utility-services/no-auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("../../app-site/app-site.module").then(m => m.AppAuthModule),
    canActivate:[NoAuthService]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class RootRoutingModule {}
