import { Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialFormsModule } from './core/layouts/material/material-forms.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LocalizationLoaderFactory } from './core/localization/localization-loader-factory';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { environment } from 'src/environments/environment';
import { DataGateTransformOptions } from './core/interceptors/data-gate-transform-options';
import { PageNotFoundHandler } from './core/errorHandler/pageNotFoundHandler';
import { AccountService } from './modules/account/account.service';
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './shared/utils/loader.service';
import { LoaderComponent } from './components/loader/loader.component';

export const getBaseUrl = () : string => {
  return environment.apiUrl;
}

@NgModule({
  declarations: [
    AppComponent,
    AccessDeniedComponent,
    LoaderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
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
    ToastrModule.forRoot()
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataGateTransformOptions,
      multi: true
    },
    PageNotFoundHandler,
    AccountService
  ],
  bootstrap: [AppComponent,LoaderService]
})
export class AppModule {
}
