import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { AppLayoutComponent } from 'src/app/core/layouts/app-layout/components/container/app-layout.component';
import { ShareClassesComponent } from './components/share-classes/share-classes.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: ShareClassesComponent }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShareClassRoutingModule { }
