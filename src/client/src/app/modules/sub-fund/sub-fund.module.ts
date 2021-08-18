import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubFundsService } from './sub-fund-service';
import { AllEntitesModule } from './../../shared/allentities/allentities.module';
import { TranslateModule } from '@ngx-translate/core';
import { AppLayoutModule } from './../../core/layouts/app-layout/app-layout.module';
import { SubFundRoutingModule } from './sub-fund-routing.module';
import { SubFundsComponent } from './components/sub-funds/sub-funds.component';


@NgModule({
  declarations: [
    SubFundsComponent
  ],
  imports: [
    CommonModule,
    SubFundRoutingModule,
    AppLayoutModule,
    TranslateModule,
    AllEntitesModule
  ],
  providers: [SubFundsService]
})
export class SubFundModule { }
