import { NgModule } from "@angular/core";

import { AppLayoutModule } from "src/app/core/layouts/app-layout/app-layout.module";
import { UserPanelRoutingModule } from "./user-panel-routing.module";

import { UserPanelComponent } from './container/user-panel.component';

@NgModule({
  imports: [
    AppLayoutModule,
    UserPanelRoutingModule
  ],
  declarations: [
    UserPanelComponent
  ]
})
export class UserPanelModule{}
