import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { AppLayoutComponent } from '../../core/layouts/app-layout/components/container/app-layout.component';

import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { UserPanelComponent } from './container/user-panel.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: UserPanelComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserPanelRoutingModule {}
