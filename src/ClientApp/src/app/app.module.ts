import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";

import { RootRoutingModule } from './root/root-routing/root-routing.module';
import { AppComponent } from './root/main/app.component';
import { AppLayoutComponent } from './root/layout/app-layout/app-layout.component';
import { AdminLayoutComponent } from './root/layout/admin-layout/admin-layout.component';
import { SiteLayoutComponent } from './root/layout/site-layout/site-layout.component';
import { ToolbarComponent } from './root/toolbar/toolbar.component';
import { ContentComponent } from './root/content/content.component';

@NgModule({
  declarations: [
    AppComponent, AppLayoutComponent, AdminLayoutComponent, 
    SiteLayoutComponent, ToolbarComponent, ContentComponent],
  imports: [
    BrowserModule, RootRoutingModule, FlexLayoutModule, 
    MatIconModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
