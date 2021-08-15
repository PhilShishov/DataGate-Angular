import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from 'src/app/core/layouts/app-layout/app-layout.module';
import { AllEntitesModule } from 'src/app/shared/allentities/allentities.module';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'src/app/core/layouts/app-layout/components/container/app-layout.component';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';
import { SearchResultComponent } from './components/search-result.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
    {
      path: '',
      component: AppLayoutComponent,
      canActivate: [AuthGuardService],
      children: [
        { path: '', component: SearchResultComponent }
      ]
    }
  ]

@NgModule({
  declarations: [
    SearchResultComponent
  ],
  imports: [
    CommonModule,
    AppLayoutModule,
    RouterModule.forChild(routes),
    TranslateModule,
    AllEntitesModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    DatePipe
  ]
})
export class SearchResultModule { }
