import { WebDatePipe } from './../../shared/pipes/webDate.pipe';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from "@angular/core";

import { AppLayoutModule } from "src/app/core/layouts/app-layout/app-layout.module";
import { UserPanelRoutingModule } from "./user-panel-routing.module";

import { SliderComponent } from './components/slider/slider.component';
import { UserPanelService } from './user-panel.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserPanelComponent } from './container/user-panel.component';

@NgModule({
  imports: [
    AppLayoutModule,
    UserPanelRoutingModule,
    TranslateModule,
    CommonModule,
    SlickCarouselModule
  ],
  declarations: [
    UserPanelComponent,
    SliderComponent,
    NotFoundComponent,
    WebDatePipe
  ],
  providers: [UserPanelService]
})
export class UserPanelModule{}
