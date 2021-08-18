import { ShareClassService } from './share-classes.serevice';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareClassRoutingModule } from './share-class-routing.module';
import { ShareClassesComponent } from './components/share-classes/share-classes.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from 'src/app/core/layouts/app-layout/app-layout.module';
import { AllEntitesModule } from 'src/app/shared/allentities/allentities.module';


@NgModule({
  declarations: [
    ShareClassesComponent
  ],
  imports: [
    CommonModule,
    ShareClassRoutingModule,
    AppLayoutModule,
    TranslateModule,
    AllEntitesModule
  ],
  providers: [
    ShareClassService
  ]
})
export class ShareClassModule { }
