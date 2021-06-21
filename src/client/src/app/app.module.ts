import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { MaterialFormsModule } from './core/layouts/material/material-forms.module';
import { AppRoutingModule } from './app-routing.module';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';

import { LocalizationLoaderFactory } from './core/localization/localization-loader-factory';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AccessDeniedComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialFormsModule,
    // Translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: LocalizationLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule { }
