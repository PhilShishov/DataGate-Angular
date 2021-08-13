import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TableLayoutComponent } from './components/table-layout/table-layout.component';
import { ToolBarComponent } from "./components/toolbar/toolbar.component";
import { ViewTableComponent } from './components/view-table/viewtable.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SearchPipe } from '../pipes/filter';
import { LayoutService } from './components/layout.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    RouterModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [
    ToolBarComponent,
    ViewTableComponent,
    TableLayoutComponent,
    SearchPipe
  ],
  exports: [
    ToolBarComponent,
    ViewTableComponent,
    TableLayoutComponent
  ],
  providers: [DatePipe,LayoutService]
})
export class AllEntitesModule{

}
