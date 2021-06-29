import { Component, Input } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'error-snackbar',
    template: `
    <mat-card class="snackbar-card">
    <mat-card-content>
      <div class="row">
        <div class="col-2 x-error">
          <i class="fas fa-times fa-3x"></i>
        </div>
        <div class="col-1"></div>
        <div class="col-9">
          <div class="row">
            <div class="col-12 title-card">
              Error
              <mat-divider></mat-divider>
            </div>
            <div class="col-12 text-card">
                <div [innerHTML]="text"></div>
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
      .x-error {
        text-align:center;
        color: #C62828;
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
  export class ErrorSnackbarComponent {

    text: string;
    constructor( public matSnackBarRef: MatSnackBarRef<ErrorSnackbarComponent>) {}

  }
