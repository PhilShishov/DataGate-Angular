import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from "@angular/core";
import { MaterialFormsModule } from "../../material/material-forms.module";
import { AboutDialogComponent } from "./about-dialog/about-dialog.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    MaterialFormsModule,
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  declarations: [
    AboutDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    AboutDialogComponent
  ],
  entryComponents: [
    AboutDialogComponent
  ]
})
export class DialogModule{

}
