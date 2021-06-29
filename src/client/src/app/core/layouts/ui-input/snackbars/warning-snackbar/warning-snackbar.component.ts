import { Component, Input } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'warning-snackbar',
    template: `
    <mat-card class="snackbar-card">
      <mat-card-content>
        <div class="row">
          <div class="col-2 triangle-warning">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
          </div>
          <div class="col-1"></div>
          <div class="col-9">
            <div class="row">
              <div class="col-12 title-card">
                Warning
                <mat-divider></mat-divider>
              </div>
              <div class="col-12 text-card">
                {{text}}
              </div>
            </div>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
    `,
  styles: [`
    .snackbar-card {
      background-color: #E0E0E0;
      color: #004d40;
      font-weight: bold;
      width: 100%;
      margin-top: 0px !important;
    }
    .triangle-warning {
      text-align:center;
      color: #E65100;
    }
    .title-card {
      text-align:left;
      padding-bottom: 10px;
    }
    .text-card {
      text-align:left;
      font-weight:normal;
    }
  `]
  })
  export class WarningSnackbarComponent {

    text: string;
    constructor( public matSnackBarRef: MatSnackBarRef<WarningSnackbarComponent>) {}

  }
