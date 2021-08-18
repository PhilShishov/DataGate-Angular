import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { AppLayoutComponent } from 'src/app/core/layouts/app-layout/components/container/app-layout.component';
import { SubFundsComponent } from './components/sub-funds/sub-funds.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component:  SubFundsComponent}
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubFundRoutingModule { }
