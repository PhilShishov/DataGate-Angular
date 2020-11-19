import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootRoutingModule } from './root-routing/root-routing.module';
import { AppComponent } from './main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { IdentityLayoutComponent } from './layout/identity-layout/identity-layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ContentComponent } from './content/content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent, AppLayoutComponent, AdminLayoutComponent, 
    IdentityLayoutComponent, ToolbarComponent, ContentComponent],
  imports: [
    BrowserModule, RootRoutingModule, FlexLayoutModule, 
    MatIconModule, BrowserAnimationsModule, MatToolbarModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
