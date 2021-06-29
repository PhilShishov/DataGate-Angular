import { NgModule } from '@angular/core';
import { WarningSnackbarComponent } from './warning-snackbar/warning-snackbar.component';
import { SnackBarsService } from './services/snackbars.service';
import { MaterialFormsModule } from '../../material/material-forms.module';
import { InfoSnackbarComponent } from './info-snackbar/info-snackbar.component';
import { ErrorSnackbarComponent } from './error-snackbar/error-snackbar.component';

@NgModule({
    imports: [
        MaterialFormsModule
    ],
    declarations: [
        InfoSnackbarComponent,
        ErrorSnackbarComponent,
        WarningSnackbarComponent
    ],
    providers: [SnackBarsService],
    exports: [
        InfoSnackbarComponent,
        ErrorSnackbarComponent,
        WarningSnackbarComponent
    ],
    entryComponents: [
        InfoSnackbarComponent,
        ErrorSnackbarComponent,
        WarningSnackbarComponent
    ]
})

export class SnackBarsModule { }
