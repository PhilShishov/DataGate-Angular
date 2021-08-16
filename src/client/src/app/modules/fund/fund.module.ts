import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from './../../core/layouts/app-layout/app-layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundRoutingModule } from './fund-routing.module';
import { FundsComponent } from './components/funds/funds.component';
import { AllEntitesModule } from 'src/app/shared/allentities/allentities.module';
import { FundsService } from './fund-service';


@NgModule({
  declarations: [
    FundsComponent
  ],
  imports: [
    CommonModule,
    FundRoutingModule,
    AppLayoutModule,
    TranslateModule,
    AllEntitesModule
  ],
  providers: [FundsService]
})
export class FundModule { }
