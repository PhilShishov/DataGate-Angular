import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppLayoutComponent } from './components/container/app-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AppLayoutModule { }
