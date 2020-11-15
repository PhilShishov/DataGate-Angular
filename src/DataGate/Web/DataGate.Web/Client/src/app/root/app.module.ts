import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootRoutingModule } from './root-routing/root-routing.module';
import { AppComponent } from './main/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ContentComponent } from './content/content.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [AppComponent,LayoutComponent,ToolbarComponent,ContentComponent],
  imports: [BrowserModule, RootRoutingModule,FlexLayoutModule,MatIconModule, BrowserAnimationsModule,MatToolbarModule],
  providers: [
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
