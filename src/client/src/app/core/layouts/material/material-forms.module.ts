import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {
// Material
MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    // Cdk Table
    CdkTableModule,
    // Cdk Drag-drop
    DragDropModule,
    // Material
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    NativeDateModule,
    // Forms
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaterialFormsModule { }
